import { Cart } from "./core/cart";
import { Catalog } from "./core/products";
import { TaxCalculator } from "./core/tax";

const execute = async () => {
  const catalog: Catalog = new Catalog();
  const taxCalculator: TaxCalculator = new TaxCalculator();
  const cart: Cart = new Cart(taxCalculator);

  const cheerios = await catalog.get("cheerios");
  const cornflakes = await catalog.get("cornflakes");
  const frosties = await catalog.get("frosties");
  const shreddies = await catalog.get("shreddies");
  const weetabix = await catalog.get("weetabix");

  cart.addToCart(cheerios);
  cart.addToCart(cornflakes);
  cart.addToCart(frosties);
  cart.addToCart(shreddies);
  const cartState = cart.addToCart(weetabix);

  console.log({cartState});
}

execute();