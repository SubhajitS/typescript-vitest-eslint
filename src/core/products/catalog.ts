import { getProduct } from "./catalog.service";
import { Product, productValidator } from "./product";

export class Catalog {

    async get(id: string): Promise<Product> {
        if (!id.trim()) throw new Error("Id should not be empty")
        if (!id.match('^[a-zA-Z0-9]')) throw new Error("Id should not contain special characters")

        const productDetails = await getProduct(id);
        
        Object.keys(productDetails).forEach(key => {
            const validator = productValidator[key];
            if(!validator(productDetails[key]))
                throw new Error(`Invalid product: product ${key} is not valid`)
        });

        return { ...productDetails, id };
    }
}