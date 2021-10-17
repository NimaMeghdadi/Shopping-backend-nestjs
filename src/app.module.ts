import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [AuthModule , UserModule,ProductModule,    MongooseModule.forRoot(
    'mongodb+srv://hamidreza:hamidreza123@home.lhb4w.mongodb.net/Shopping-term7?retryWrites=true&w=majority',
  ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
