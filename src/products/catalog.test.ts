import { vi } from "vitest";
import * as CatalogSvc from "./catalog.service"
import { Catalog } from "."

describe("Catalog test", () => {
    let catalog: Catalog
    let catalogService = vi.spyOn(CatalogSvc, "getProduct");
    
    beforeEach(() => {
        catalogService.mockReset();
        catalog = new Catalog();
    })

    it("should return product", async () => {
        catalogService.mockResolvedValueOnce({ title: "A beutiful mind", price: 9.99 });

        const book = await catalog.get("A-beutiful-mind");

        expect(book).toEqual({ id: "A-beutiful-mind", title: "A beutiful mind", price: 9.99 })

        catalogService.mockResolvedValueOnce({ title: "Cornflakes", price: 5.99 });

        const cereal = await catalog.get("cornflakes");

        expect(cereal).toEqual({ id: "cornflakes", title: "Cornflakes", price: 5.99 });
    })

    it("should return error if id is empty", async () => {
        expect(async () => await catalog.get("")).rejects.toThrowError("Id should not be empty");
        expect(async () => await catalog.get(" ")).rejects.toThrowError("Id should not be empty");
    });

    it("should return error if product id contains any special character", async () => {
        expect(async () => await catalog.get("?file=index")).rejects.toThrowError("Id should not contain special characters");
    });

    it("should return valid product detail", async () => {
        catalogService.mockResolvedValueOnce({ title: "", price: 9.99 });

        expect(async () => await catalog.get("sample-product")).rejects.toThrowError("Invalid product: product title is not valid");
    })
})