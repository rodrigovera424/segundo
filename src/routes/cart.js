//----------* IMPORTS *----------//
import { Router } from "express";
import cartController from "../controllers/cartController.js";

const cartRouter = new Router();

cartRouter.get("/", cartController.cartList);

cartRouter.get("/:id", cartController.getCartById);

cartRouter.get("/:id/productos", cartController.cartProductList);

cartRouter.post("/", cartController.createNewCart);

cartRouter.post("/:id/productos/:id_prod", cartController.addProductToCart);

cartRouter.delete(
  "/:id/productos/:id_prod",
  cartController.deleteProductFromCart
);

cartRouter.delete("/:id", cartController.emptyCart);

export { cartRouter };
