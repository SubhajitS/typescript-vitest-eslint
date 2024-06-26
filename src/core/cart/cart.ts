import { Product } from "../products";
import { TaxCalculator } from "../tax";
import { CartItem, CartState } from ".";

export class Cart {
    private _items: Map<string, CartItem> = new Map();

    constructor(private _taxCalculator: TaxCalculator) {}

    addToCart(product: Product, quantity: number = 1): CartState {
        if(quantity<=0) throw new Error("Quantity must be more than one");
        
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

    private getState(): CartState {
        const cartItems = [...this._items.values()];
        const subTotal = this.getSubTotal(cartItems);
        const tax = this._taxCalculator.calculate(subTotal);

        return { items: cartItems, subTotal: subTotal, totalTax: tax, total: subTotal + tax };
    }
}