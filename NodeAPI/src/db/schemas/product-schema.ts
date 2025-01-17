import { Schema } from "mongoose";
import { IProduct } from "../../@types/@types";
import addressSchema from "./address-schema";
import imageSchema from "./image-schema";

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, minlength: 2, maxlength: 256 },
  subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
  description: { type: String, required: true, minlength: 2, maxlength: 1024 },
  price: { type: Number, required: true, min: 1, max: 99999999999 },
  image: { type: imageSchema, required: true },
  quantity: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  createdAt: { type: Date, required: false, default: new Date() },
  userId: { type: String, required: true },
  barcode: { type: Number, required: true, min: 1000000, max: 9999999 },
});


export default productSchema;