import { ContenedorFirebase } from "../../db/ContenedorFirebase.js";

class ProductoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

export { ProductoFirebase };
