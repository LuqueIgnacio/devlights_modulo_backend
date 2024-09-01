import { Schema, model } from "mongoose";
import { ICart } from "./types";

const cartModel = new Schema({
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
  expires_at: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 2),
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  }
}, {timestamps: true});

cartModel.index({createdAt: 1}, {expireAfterSeconds: 60 * 60 * 24})

const Cart = model("Cart", cartModel);
export default Cart;