import { Product } from "./product"

export const getProduct = async (url: string): Promise<{[key: string]: string | number, title: string, price: number}> => {
    const response = await fetch(`https://equalexperts.github.io/backend-take-home-test-data/${url}.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) throw new Error(`${response.statusText} : ${url}`)

    return response.json() as Promise<{title: string, price: number}>;
}
