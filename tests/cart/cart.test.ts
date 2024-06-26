import { Cart } from "../../src/cart";
import { Product } from "../../src/products";
import { TaxCalculator } from "../../src/tax";

describe("Cart tests", () => {
    function createProduct(id: string, title: string, price: number): Product {
        return {
            id,
            title,
            price
        };
    }

    describe("Add to cart", () => {
        let cart: Cart;
        const taxCalculator = new TaxCalculator();
        beforeEach(() => {
            cart = new Cart(taxCalculator);
        })

        it("should add single product to cart", () => {
            const sampleProduct: Product = createProduct("sample", "sample product", 9.99)

            const state = cart.addToCart(sampleProduct);

            expect(state.items.length).toEqual(1);
            expect(state.items.find(p => p.product.id === sampleProduct.id)?.quantity).toEqual(1);
        });

        it("should add multiple items of same product", () => {
            const sampleProduct: Product = createProduct("sample", "sample product", 9.99)

            let state = cart.addToCart(sampleProduct);
            state = cart.addToCart(sampleProduct);

            expect(state.items.length).toEqual(1);
            expect(state.items.find(p => p.product.id === sampleProduct.id)?.quantity).toEqual(2);
        })

        it('should add multiple items of different products', () => {
            const sampleProduct1: Product = createProduct("sample1", "sample product1", 9.99)
            const sampleProduct1Quantity = 2
            const sampleProduct2: Product = createProduct("sample2", "sample product2", 9.99)
            const sampleProduct2Quantity = 5

            cart.addToCart(sampleProduct1, sampleProduct1Quantity);
            const state = cart.addToCart(sampleProduct2, sampleProduct2Quantity);

            expect(state.items.length).toEqual(2);
            expect(state.items.find(p => p.product.id === sampleProduct1.id)?.quantity).toEqual(sampleProduct1Quantity);
            expect(state.items.find(p => p.product.id === sampleProduct2.id)?.quantity).toEqual(sampleProduct2Quantity);
        })

        it('should add two instances of same product', () => {
            const sampleProductInstance1: Product = createProduct("sample", "sample product", 9.99)
            const sampleProductInstance2: Product = createProduct("sample", "sample product", 9.99)

            cart.addToCart(sampleProductInstance1, 2);
            const state = cart.addToCart(sampleProductInstance2, 1);

            expect(state.items.length).toEqual(1);
            expect(state.items.find(p => p.product.id === sampleProductInstance1.id)?.quantity).toEqual(3)
        })

        it('should return the subtotal, tax and total of the items added', () => {
            const sampleProduct: Product = createProduct("sample", "sample product", 9.99);

            const state = cart.addToCart(sampleProduct, 10);

            expect(state.subTotal).toEqual(99.9);
            expect(state.totalTax).toEqual(99.9*12.5/100);
            expect(state.total).toEqual(state.subTotal + state.totalTax);
        })

        it('should not add product to cart if quantity is less than or equal to zero', () => {
            const sampleProduct: Product = createProduct("sample", "sample product", 9.99);

            expect(() => cart.addToCart(sampleProduct, 0)).toThrowError("Quantity must be more than one");
        })
    });
});