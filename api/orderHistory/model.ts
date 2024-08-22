import { Schema, model } from "mongoose";

const orderHistorySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      sub_total:{
        type: Number,
        required: true
      }
    },
  ],
  total_price:{
    type: Number,
    required: true
  }
  }, 
  {timestamps: true}
);

const OrderHistory = model("OrderHistory", orderHistorySchema);

export default OrderHistory;
