import { Product } from "../products";
import { CartItem } from "./cart-item";

export interface CartState {
    items: Array<CartItem>;
    subTotal: number;
    totalTax: number;
    total: number;
}