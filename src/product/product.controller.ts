import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
import { KIND } from './product.model';
  import { ProductService } from './product.service';
  
  
  @Controller('product')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Post("/addproduct")
    async addProduct(
        @Body('name') name: string,
        @Body('expirationDate') expirationDate: string,
        @Body('productionDate') productionDate: string,
        @Body('price') price: number,
        @Body('numberOfEntity') numberOfEntity: number,
        @Body('description') description: string,
        @Body('imgUrls') imgUrls: string[],
        @Body('kind') kind: typeof KIND,
        @Body('imgUrl') imgUrl: string,
    ) {
      const generatedId = await this.productService.insertProduct(
        name,
        expirationDate,
        productionDate,
        price,
        numberOfEntity,
        description,
        imgUrls,
        kind,
        imgUrl,
        );
      return { id: generatedId };
    }
  
    @Get(':_id')
    async getSingleProduct(@Param('_id') productID: string) {
      const Product = await this.productService.getSingleProduct(productID);
      return Product;
    }
  
    @Get()
    async getAllProduct() {
      const Products = await this.productService.getAllProducts();
      return Products;
    }
  
    @Delete(':_id')
    async removeProduct(@Param('_id') ProductID: string) {
      await this.productService.deleteProduct(ProductID);
      return null;
    }
  
    @Patch(':_id')
    async updateProduct(
      @Param('_id') _id: string,
      @Body('name') name: string,
      @Body('expirationDate') expirationDate: string,
      @Body('productionDate') productionDate: string,
      @Body('price') price: number,
      @Body('numberOfEntity') numberOfEntity: number,
      @Body('description') description: string,
      @Body('imgUrls') imgUrls: string[],
      @Body('kind') kind: typeof KIND,
      @Body('imgUrl') imgUrl: string,
    ) {
      await this.productService.updateProduct(
        _id,
        name,
        expirationDate,
        productionDate,
        price,
        numberOfEntity,
        description,
        imgUrls,
        kind,
        imgUrl,
      );
      return null;
    }
  }

