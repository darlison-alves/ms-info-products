import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductDTO } from "src/domain/dtos/product.dto";
import { CreateProductHandler } from "src/domain/handlers/create.product.handler";
import { ListProductHandler } from "src/domain/handlers/list.product.handler";

@Controller('/products')
export class ProductController {

    constructor(
        private createProductHandler: CreateProductHandler,
        private listProducthandler: ListProductHandler    
    ) { }

    @Get()
    public getProducts() {
        return this.listProducthandler.handle()
    }

    @Post()
    public create(@Body() productDTO: ProductDTO ) {
        return this.createProductHandler.handle(productDTO);
    }
}