import { Product } from "../products";
import { CartItem } from "./cart-item";
import { CartState } from "./cart-state";

export class Cart {
    private _items: Map<string, CartItem> = new Map();

    addToCart(product: Product, quantity: number = 1): CartState {
        const productSymbol = Symbol()
        if (this._items.has(product.id)) {
            const existingItem = this._items.get(product.id)!;
            existingItem.quantity += quantity;
            this._items.set(product.id, existingItem)
        } else {
            this._items.set(product.id, {product, quantity});
        }

        return { items: [...this._items.values()], subTotal: 0, totalTax: 0, total: 0 };
    }
}