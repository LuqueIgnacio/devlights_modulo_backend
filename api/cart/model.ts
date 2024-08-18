import { Schema, model } from "mongoose";
import { ICart } from "./type";

const cartModel = new Schema<ICart>({
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 2),
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Cart = model<ICart>("Cart", cartModel);
export default Cart;