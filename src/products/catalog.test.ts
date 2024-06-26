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
})