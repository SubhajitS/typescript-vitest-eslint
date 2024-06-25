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
            this._items.set(product.id, { product, quantity });
        }

        return this.getState();
    }

    private getSubTotal(items: Array<CartItem>): number {
        return items.map(i => i.product.price * i.quantity).reduce((sum, current) => sum + current);
    }

    private calculateTax(subTotal: number): number {
        const taxRate = 12.5
        return subTotal * taxRate / 100
    }

    private getState(): CartState {
        const cartItems = [...this._items.values()];
        const subTotal = this.getSubTotal(cartItems);
        const tax = this.calculateTax(subTotal);

        return { items: cartItems, subTotal: subTotal, totalTax: tax, total: subTotal + tax };
    }
}