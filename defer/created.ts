import { defer } from "@defer/client";
import prisma from "../src/utils/prisma/prisma";
import { printful } from "../src/server/services/printful";

 const createImages = async (id: number) => {
    
    
  const product = await printful.getProductInfo(id);

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
    return 
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


  let retries = 0; // Count retries
  const maxRetries = 10; // Set a maximum retry count
  const intervalTime = 5000; // 5 seconds
  const intervalId = setInterval(async () => {
    // Fetch mockup task status
    const retrieveMockupTask = await printful.retrieveMockUpImages(
      runMockupTask.task_key
    );

    console.log(retrieveMockupTask,'testt')

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
          return 
      } else {
        return 
      }
    }

    retries++;
  }, intervalTime);

}

export default defer(createImages);

