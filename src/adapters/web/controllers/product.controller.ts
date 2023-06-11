import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ProductBuyDTO } from "src/domain/dtos/product.buy.dto";
import { ProductDTO } from "src/domain/dtos/product.dto";
import { CreateProductHandler } from "src/domain/handlers/create.product.handler";
import { ListProductHandler } from "src/domain/handlers/list.product.handler";
import { PurchaseProductHandler } from "src/domain/handlers/purchase.product.handler";
import { IPurchaseProductUseCase } from "src/ports/inbound/purchase.product.use.case";

@Controller('/products')
export class ProductController {

    constructor(
        private createProductHandler: CreateProductHandler,
        private listProducthandler: ListProductHandler,
        @Inject(PurchaseProductHandler) private purchaseProductHandler: IPurchaseProductUseCase
    ) { }

    @Get()
    public getProducts() {
        return this.listProducthandler.handle()
    }

    @Post()
    public create(@Body() productDTO: ProductDTO ) {
        return this.createProductHandler.handle(productDTO);
    }

    @Post('/buy')
    public buy( @Body() payload: ProductBuyDTO ) {
        return this.purchaseProductHandler.handle(payload)
    }
}