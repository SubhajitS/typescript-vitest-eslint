export interface Product {
    id: string;
    title: string;
    price: number;
}

export const TitleValidator = (value: string | number): boolean => {
    if(typeof value === 'string')
        return !!value && !!value.trim();
    return false;
}

export const PriceValidator = (value: string | number): boolean => {
    if(typeof value === 'number')
        return value >= 0;
    return false;
}

export const productValidator: {[key: string]: (value: string | number) => boolean} = {'title': TitleValidator, 'price': PriceValidator}