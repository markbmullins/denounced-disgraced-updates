import { NextApiRequest, NextApiResponse } from "next";

import { printful } from "../../../../server/services/printful";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const body = req.body
  const body = req.body;

  //   const subscribe = await printful.subscribeToWebhook({
  //     url: "https://test-ten-alpha-56.vercel.app/api/webhooks/printful/created",
  //     types: ["package_shipped", "product_updated"],
  //   });


  const product = await printful.getProductInfo(body.data.sync_product.id);
  const productId = product.sync_variants[0].product.product_id;

  const variantIdByColor = product.sync_variants.reduce(
    (accumulator, variant) => {
      // Check if the color key already exists
      if (!accumulator[variant.color]) {
        accumulator[variant.color] = [];
      }

      // Push the variant_id to the array associated with the color
      accumulator[variant.color].push(variant.variant_id);

      return accumulator;
    },
    {}
  );

  console.log(variantIdByColor);

  const productTemplates = await printful.getProductTemplates();

  const currentTemplate = productTemplates.items.find(
    (item) => item.title === product.sync_product.name
  );

  const allOptions = await printful.getAllPrintOptions(productId);

  // console.log(file)

  const runMockupTask = await printful.createMockUpImages(productId, {
    variant_ids: currentTemplate.available_variant_ids,
    format: "png",
    options: allOptions.options,
    product_template_id: currentTemplate.id,
  });

  const retrieveMockupTask = await printful.retrieveMockUpImages(
    runMockupTask.task_key
  );
  // console.log(retrieveMockupTask)

  let retries = 0; // Count retries
  const maxRetries = 10; // Set a maximum retry count
  const intervalTime = 5000; // 5 seconds
  const intervalId = setInterval(async () => {
    // Fetch mockup task status
    const retrieveMockupTask = await printful.retrieveMockUpImages(
      runMockupTask.task_key
    );

    // If status is not pending or max retries reached, clear the interval
    if (retrieveMockupTask.status !== "pending" || retries >= maxRetries) {
      clearInterval(intervalId);

      if (retrieveMockupTask.status !== "pending") {
        const sortedMockups = retrieveMockupTask.mockups.reduce((acc, item) => {
          const mockupColor = Object.keys(variantIdByColor).find((color) =>
            item.variant_ids.some((variantId) =>
              variantIdByColor[color].includes(variantId)
            )
          );
          acc.push({
            //@ts-ignore

            [mockupColor]: [
              ...item.extra,
              { title: "main", url: item.mockup_url },
            ],
          });
          return acc;
        }, []);

        if (fs.existsSync("mockups.json")) {
          // If it exists, read the file
          const existingData = JSON.parse(
            fs.readFileSync("mockups.json", "utf8")
          );

          // Add the new data to the existing data
          existingData[product.sync_product.id] = sortedMockups;

          // Write the updated data back to the file
          fs.writeFileSync(
            "mockups.json",
            JSON.stringify(existingData, null, 2),
            "utf8"
          );
        } else {
          // If the file doesn't exist, write the new data to a new file
          fs.writeFileSync(
            "mockups.json",
            JSON.stringify(
              { [product.sync_product.id]: sortedMockups },
              null,
              2
            ),
            "utf8"
          );
        }

        res.status(200).json({ message: "saved", data: retrieveMockupTask });
      } else {
        res.json({ message: "Max retries reached", data: retrieveMockupTask });
      }
    }

    retries++;
  }, intervalTime);
}
