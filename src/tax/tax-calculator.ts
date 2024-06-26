export class TaxCalculator {
    private _taxRate = 12.5

    calculate(subTotal: number): number {
        if (subTotal < 0) throw new Error("Cannot calculate tax on values less than zero")
        return subTotal * this._taxRate / 100
    }
}