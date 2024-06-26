import { getProduct } from "./catalog.service";
import { Product } from "./product";

export class Catalog {

    async get(id: string): Promise<Product> {
        const product = await getProduct(id);
        //Validate product before returning
        return {...product, id};
    }
}