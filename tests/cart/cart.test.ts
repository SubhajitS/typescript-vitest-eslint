import { Cart } from "../../src/cart";
import { Product } from "../../src/products";

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
        beforeEach(() => {
            cart = new Cart();
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
    });
});