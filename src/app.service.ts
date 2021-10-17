import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  // if you want generate your unique key
 // async generateKey(model: Model<any>) : string {
  //   let users = await model.find().sort({ _id: -1 }).limit(1);
  //   let lastUser = users[0];
  //   const { key } = lastUser;

  //   // let firstLetter =
  //   // key = 'c10'

  //   console.log('mmd1');
  //   console.log(this.splitKey('c10'));
  //   return this.splitKey('s52')

  //   // console.log(await model.find().sort({ _id: -1 }).limit(1).exec());
  // }

  // splitKey(key: string): string {
  //   let letterOfKey = key.split('', 1);
  //   let numberOfKey = Number(key.substring(1, key.split('').length)) + 1;
  //   return letterOfKey + numberOfKey.toString();
  // }
}
