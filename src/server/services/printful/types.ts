import exp from "constants";

export type SyncProduct = {
  external_id: string;
  id: number;
  is_ignored: boolean;
  name: string;
  synced: number;
  thumbnail_url: string;
  variants: number;
};

export type PrintfulProductType = {
  sync_product: SyncProduct;
  sync_variants: SyncProductVariant[];
};

export type SyncProductVariant = {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  main_category_id: number;
  warehouse_product_variant_id: null;
  retail_price: string;
  sku: string;
  currency: string;
  product: Product;
  files: ProductFile[];
  options: ProductOption[];
  is_ignored: boolean;
  size: string;
  color: string;
  availability_status: string;
};

type Product = {
  variant_id: number;
  product_id: number;
  image: string;
  name: string;
};

type ProductFile = {
  id: number;
  type: string;
  hash: string | null;
  url: string | null;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  dpi: number | null;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
  is_temporary: boolean;
};

type ProductOption = {
  id: string;
  value: string;
};


export  type OrderItems = {
  sync_variant_id: number,
  quantity:number,
}
export type ShippingItems = {
  variant_id: number,
  quantity:number
}

type Recipient = {
  name: string;
  address1: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
}

export type PrintfulOrder = {
  recipient: Recipient,
  items:OrderItems[]
}

export type PrintfulShipping = {
  recipient: Recipient,
  items:ShippingItems[]

}
