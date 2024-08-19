import { Schema, model } from "mongoose";

const orderHistorySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carts: [
    {
      cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      },
    },
  ],
});

const OrderHistory = model("OrderHistory", orderHistorySchema);

export default OrderHistory;
