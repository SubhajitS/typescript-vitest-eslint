import { getProduct } from "./catalog.service"

describe("Catalog service tests", () => {
    let fetchSpy = vi.spyOn(globalThis, "fetch");

    function createResponse(data: any, httpStatus: number = 200, httpStatusText: string = "OK"): Response {
        return {
            json: () => Promise.resolve(data),
            ok: httpStatus>199 && httpStatus < 300,
            status: httpStatus,
            statusText: httpStatusText
        } as Response
    }

    beforeEach(() => {
        fetchSpy.mockReset();
    })

    it("should return valid product", async () => {
        const responseObj = { title: "Corn Flakes", price: 2.50 };
        fetchSpy.mockResolvedValueOnce(createResponse(responseObj));

        const cornflakes = await getProduct("cornflakes");

        expect(cornflakes).toEqual(responseObj);
        expect(fetchSpy).toHaveBeenCalledOnce();
    });

    it ("should throw error if invalid response", () => {
        const responseObj = {};
        fetchSpy.mockResolvedValueOnce(createResponse(responseObj, 404, "Product not found"));

        expect(() => getProduct("item404")).rejects.toThrowError("Product not found");
    });

    it("should throw error if fetch function throws error", () => {
        fetchSpy.mockImplementationOnce(() => Promise.reject("timeout error"));

        expect(() => getProduct("beer")).rejects.toThrowError("timeout error");
    })
})