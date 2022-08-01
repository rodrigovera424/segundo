//----------* IMPORTS *----------//
import { Router } from "express";
import productController from "../controllers/productController.js";
import userAuthMW from "../middlewares/userAuth.js";

const productRouter = new Router();

productRouter.get("/", productController.productList);

productRouter.get("/:id", productController.getProductById);

productRouter.post("/", userAuthMW.adminAuth, productController.addNewProduct);

productRouter.put("/:id", userAuthMW.adminAuth, productController.editProduct);

productRouter.delete(
  "/:id",
  userAuthMW.adminAuth,
  productController.deleteProduct
);

productRouter.delete(
  "/",
  userAuthMW.adminAuth,
  productController.deleteProductList
);

export { productRouter };
