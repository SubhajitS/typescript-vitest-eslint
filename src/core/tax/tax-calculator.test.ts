import { TaxCalculator } from "."

describe("Tax calculator", () => {
    let taxCalculator: TaxCalculator
    beforeEach(() => {
        taxCalculator = new TaxCalculator();
    })

    it("should calculate total tax", () => {
        const totalTax = taxCalculator.calculate(100);

        expect(totalTax).toEqual(12.5)
    })

    it("should calculate zero if the amount is zero", () => {
        const totalTax = taxCalculator.calculate(0);

        expect(totalTax).toEqual(0)
    })

    it("should throw error if amount is negative", () => {
        expect(() => taxCalculator.calculate(-1)).toThrowError("Cannot calculate tax on values less than zero");
    })
})