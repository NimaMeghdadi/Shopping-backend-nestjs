import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KIND, Product } from './product.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    name: string,
    expirationDate: string,
    productionDate: string,
    price: number,
    numberOfEntity: number,
    description: string,
    imgUrls: Array<string>,
    kind: typeof KIND,
    imgUrl: string,
  ): Promise<string> {
    const newProduct = new this.productModel({
      name,
      expirationDate,
      productionDate,
      price,
      numberOfEntity,
      description,
      imgUrls,
      kind,
      imgUrl,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getAllProducts(model, sort) {
    let products = null;
    products = await this.productModel.find(model).sort(sort).exec();
    return products;
  }

  async getSingleProduct(productID) {
    const product = await this.productModel.findById(productID);
    return product;
  }

  async deleteProduct(productID) {
    const result = await this.productModel.deleteOne({ _id: productID }).exec();
    // if (result === '0') {
    //   throw new NotFoundException('Could not find Product.');
    // }
  }

  async updateProduct(
    _id: string,
    name: string,
    expirationDate: string,
    productionDate: string,
    price: number,
    numberOfEntity: number,
    description: string,
    imgUrls: Array<string>,
    kind: typeof KIND,
    imgUrl: string,
  ) {
    const updatedProduct = await this.getSingleProduct(_id);
    if (name) {
      updatedProduct.name = name;
    }
    if (expirationDate) {
      updatedProduct.expirationDate = expirationDate;
    }
    if (productionDate) {
      updatedProduct.productionDate = productionDate;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (numberOfEntity) {
      updatedProduct.numberOfEntity = numberOfEntity;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (imgUrls) {
      updatedProduct.imgUrls = imgUrls;
    }
    if (kind) {
      updatedProduct.kind = kind;
    }
    if (imgUrl) {
      updatedProduct.imgUrl = imgUrl;
    }
    updatedProduct.save();
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getProductSearchData() {
    const result = await this.productModel.aggregate([
      {
        $group: { _id: null, max: { $max: '$price' } },
      },
    ]);
    let maxPrice = result[0].max;
    return { maxPrice: maxPrice };
  }
}
