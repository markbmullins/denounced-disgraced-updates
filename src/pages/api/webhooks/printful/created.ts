import { NextApiRequest, NextApiResponse } from "next";

import { printful } from "../../../../server/services/printful";
import fs from "fs";
import prisma from "../../../../utils/prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body

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

  const productTemplates = await printful.getProductTemplates();

  const currentTemplate = productTemplates.items.find(
    (item) => item.title === product.sync_product.name
  );

  console.log(currentTemplate)

  if (!currentTemplate) {
    res.json({ message: "Could not find the template", data: currentTemplate });
  }

  const allOptions = await printful.getAllPrintOptions(productId);


  // console.log(file)

  const runMockupTask = await printful.createMockUpImages(productId, {
    variant_ids: currentTemplate.available_variant_ids,
    format: "png",
    options: allOptions.options,
    product_template_id: currentTemplate.id,
    option_groups: allOptions.option_groups,
  });

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

          const mockupData = item.extra
            ? [...item.extra, { title: item.placement, url: item.mockup_url }]
            : [
                {
                  title: item.placement,
                  url: item.mockup_url,
                },
              ];
          //@ts-ignore

          if (acc[mockupColor]) {
            //@ts-ignore

            acc[mockupColor].push(...mockupData);
          } else {
            //@ts-ignore
            acc[mockupColor] = mockupData;
          }

          return acc;
        }, {});

        const save = await prisma.product.create({
          data: {
            printfulId: product.sync_product.id,
            images: JSON.stringify(sortedMockups),
          },
        });

        console.log(sortedMockups)
        console.log(save)
        res.status(200).json({ message: "saved", data: retrieveMockupTask });
      } else {
        res.json({ message: "Max retries reached", data: retrieveMockupTask });
      }
    }

    retries++;
  }, intervalTime);
}
