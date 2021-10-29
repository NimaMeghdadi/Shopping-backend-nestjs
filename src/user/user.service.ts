import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.model';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertUser(
    fName: string,
    lName: string,
    username: string,
    password: string,
    roleID: number,
    phone: string,
    email: string,
    imgURL: string,
  ): Promise<string> {
    // this.appService.generateKey(this.userModel);
    let salt = await bcrypt.genSalt();
    let pass = await this.hashPassword(password, salt);
    const newUser = new this.userModel({
      fName,
      lName,
      username,
      password: pass,
      roleID,
      salt,
      phone,
      email,
      imgURL,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getSingleUser(userID) {
    const user = await this.userModel.findById(userID);
    return user;
  }

  async deleteUser(userID) {
    const result = await this.userModel.deleteOne({ _id: userID }).exec();
    // if (result === '0') {
    //   throw new NotFoundException('Could not find User.');
    // }
  }

  async updateUser(
    id: string,
    fName: string,
    lName: string,
    username: string,
    password: string,
    roleID: number,
    phone: string,
    email: string,
    imgURL: string,
  ) {
    const updatedUser = await this.getSingleUser(id);
    if (fName) {
      updatedUser.fName = fName;
    }
    if (lName) {
      updatedUser.lName = lName;
    }
    if (username) {
      updatedUser.username = username;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (roleID) {
      updatedUser.roleID = roleID;
    }
    if (phone) {
      updatedUser.phone = phone;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (imgURL) {
      updatedUser.imgURL = imgURL;
    }
    updatedUser.save();
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async insertCardToUser(
    userID: string,
    status: string,
    address: string,
    totalPrice: number,
    arrivalDate: string,
    description: string,
    createCardDate: string,
    productIDs: string[],
  ) {
    var obj_ids = productIDs.map((id) => {
      return new Types.ObjectId(id.toString());
    });
    const cardModel = {
      status,
      address,
      totalPrice,
      arrivalDate,
      description,
      createCardDate,
      prodcuts: obj_ids,
    };
    const newCard = await this.userModel.update(
      { _id: new Types.ObjectId(userID) },
      {
        $push: {
          cards: cardModel,
        },
      },
    );
    return newCard;
  }
  async findAllUserCards(id: string) {
    let user;
    let cards;
    
    try {
      user = await this.userModel.findById(id).exec();
      cards = user.cards;
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return cards;
  }


  // test(cards){
  //   let newCards = [];
  //   cards.forEach(async (item, i) => {
  //     let produvtObjectIds = item.prodcuts.map(
  //       (id) => new Types.ObjectId(id),
  //     );
  //     let products = await this.productModel.find(
  //       { _id: { $in: produvtObjectIds } },
  //       null,
  //     );
  //     // let products = this.productService.getAllProducts({ _id: { $in: produvtObjectIds } },null)
  //     console.log(products);
  //     console.log(newCards.length);
  //     console.log(i);

  //     newCards.push({ ...item, products: products });
  //   });
  // }

  async test(card){
    let produvtObjectIds = card.prodcuts.map(
            (id) => new Types.ObjectId(id),
          );
          let products = await this.productModel.find(
            { _id: { $in: produvtObjectIds } },
            null,
          );
return products
  }
}
