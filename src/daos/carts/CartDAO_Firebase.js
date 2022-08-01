import FirebaseContainer from "../../classes/firebaseContainer.js";

class CartDAOFirebase extends FirebaseContainer {
  constructor() {
    super("carts");
  }
}

export default CartDAOFirebase;
