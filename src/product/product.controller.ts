import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { KIND } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/addproduct')
  async addProduct(
    @Body('name') name: string,
    @Body('expirationDate') expirationDate: string,
    @Body('productionDate') productionDate: string,
    @Body('price') price: number,
    @Body('numberOfEntity') numberOfEntity: number,
    @Body('description') description: string,
    @Body('imgUrls') imgUrls: string[],
    @Body('category') kind: typeof KIND,
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

  @Get('/search')
  async getProductSearchData() {
    const ProductSearchData = await this.productService.getProductSearchData();
    return ProductSearchData;
  }

  @Get(':_id')
  async getSingleProduct(@Param('_id') productID: string) {
    const Product = await this.productService.getSingleProduct(productID);
    return Product;
  }

  @Get()
  async getAllProduct(@Query() query) {
    const { name, minPrice, maxPrice, sortWith, increase } = query;
    let model = {};
    let sort = {}
    if (name) {
      model = {
        name: { $regex: name, $options: 'i' },
      };
    }
    if (minPrice && maxPrice) {
      let temp = { $gt: Number(minPrice), $lt: Number(maxPrice) };
      model = {
        ...model,
        price: temp,
      };
    }
    if(sortWith && increase != null){
      let sortValue = increase == 1 ? 1 : -1;
      if(sortWith == 'price'){
        sort = {price : sortValue}
      }
    }

    const Products = await this.productService.getAllProducts(
      model,
      sort
    );
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
