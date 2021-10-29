import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.model';
import { ProductSchema } from 'src/product/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    // ProductModule
  ],
  controllers: [UserController],
  providers: [UserService,
    
    // ProductService
  ],
})
export class UserModule {}
