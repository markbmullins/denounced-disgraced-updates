import { defer } from "@defer/client";
import prisma from "../src/utils/prisma/prisma";
import { printful } from "../src/server/services/printful";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createImages = async (id: number) => {
  const product = await printful.getProductInfo(id);
  const productId = product.sync_variants[0].product.product_id;

  const variantIdByColor = product.sync_variants.reduce(
    (accumulator, variant) => {
      if (!accumulator[variant.color]) {
        accumulator[variant.color] = [];
      }
      accumulator[variant.color].push(variant.variant_id);
      return accumulator;
    },
    {}
  );

  const productTemplates = await printful.getProductTemplates();
  const currentTemplate = productTemplates.items.find(item => item.title === product.sync_product.name);

  if (!currentTemplate) {
    return;
  }

  const allOptions = await printful.getAllPrintOptions(productId);
  const runMockupTask = await printful.createMockUpImages(productId, {
    variant_ids: currentTemplate.available_variant_ids,
    format: "png",
    options: allOptions.options,
    product_template_id: currentTemplate.id,
    option_groups: allOptions.option_groups,
  });

  let retries = 0;
  const maxRetries = 10;
  const intervalTime = 5000;

  let taskStatus = "pending";
  while (taskStatus === "pending" && retries < maxRetries) {
    const retrieveMockupTask = await printful.retrieveMockUpImages(runMockupTask.task_key);
    taskStatus = retrieveMockupTask.status;
    
    if (taskStatus !== "pending") {
      const sortedMockups = retrieveMockupTask.mockups.reduce((acc, item) => {
        const mockupColor = Object.keys(variantIdByColor).find(color => item.variant_ids.some(variantId => variantIdByColor[color].includes(variantId)));
        const mockupData = item.extra ? [...item.extra, { title: item.placement, url: item.mockup_url }] : [{ title: item.placement, url: item.mockup_url }];
        //@ts-ignore
        if (acc[mockupColor]) {
          acc[mockupColor].push(...mockupData);
        } else {
          //@ts-ignore
          acc[mockupColor] = mockupData;
        }

        return acc;
      }, {});

     const data=  await prisma.product.create({
        data: {
          printfulId: product.sync_product.id,
          images: JSON.stringify(sortedMockups),
        },
     });
      console.log(data)
    } else {
      retries++;
      await delay(intervalTime);
    }
  }
};

export default defer(createImages);
