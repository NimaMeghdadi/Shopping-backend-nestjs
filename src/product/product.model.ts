import * as mongoose from 'mongoose';
import { type } from 'os';
import { of } from 'rxjs';

export const KIND =  ["car" , "cloth" , "electric"]

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expirationDate: { type: String, required: false },
    productionDate: { type: String, required: false },
    price: { type: Number, required: true },
    numberOfEntity: { type: Number, required: false },
    description: { type: String, required: false },
    imgUrls: { type: Array, required: false }, // 1. Admin  2. Employee  3. Customer
    kind: { type : KIND , required: false },
    imgUrl: { type: String, required: false },
});

export interface Product extends mongoose.Document 
{
    id: string;
    name: string;
    expirationDate: string;
    productionDate: string;
    price: number;
    numberOfEntity: number;
    description: string;
    imgUrls: Array<string>;
    kind: typeof KIND  ;
    imgUrl: string;
}
