import { createPrintfulClient } from "./client";
import { createPrintfulGateway } from "./gateway";

const client = createPrintfulClient();

export const printful = createPrintfulGateway(client);
