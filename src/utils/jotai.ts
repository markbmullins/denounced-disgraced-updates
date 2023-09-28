import { atom } from "jotai";

export const  filterParamsAtom = atom<any>({
    productLine: [],
    productType: [],
    artStyle: [],
    productColor: [],
    price: [],
  });