import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fName: { type: String, required: false },
  lName: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  roleID: { type: Number, required: true }, // 1. Admin  2. Employee  3. Customer
  salt: { type: String, required: true },
  imgUrl: { type: String, required: false },
  prodcuts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

export interface User extends mongoose.Document {
  id: string;
  fName: string;
  lName: string;
  username: string;
  password: string;
  roleID: number;
  salt: string;
  phone: string;
  email: string;
  imgURL: string;
}
