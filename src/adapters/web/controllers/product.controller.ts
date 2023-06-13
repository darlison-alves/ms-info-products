import { Body, Controller, Get, Inject, Post, Put } from "@nestjs/common";
import { ProductBuyDTO } from "src/domain/dtos/product.buy.dto";
import { ProductDTO } from "src/domain/dtos/product.dto";
import { CancelProductHandler } from "src/domain/handlers/cancel.product.handler";
import { CreateProductHandler } from "src/domain/handlers/create.product.handler";
import { ListProductHandler } from "src/domain/handlers/list.product.handler";
import { PurchaseProductHandler } from "src/domain/handlers/purchase.product.handler";
import { ICancelProductUseCase } from "src/ports/inbound/cancel.product.use.case";
import { IPurchaseProductUseCase } from "src/ports/inbound/purchase.product.use.case";

@Controller('/products')
export class ProductController {

    constructor(
        private createProductHandler: CreateProductHandler,
        private listProducthandler: ListProductHandler,
        @Inject(PurchaseProductHandler) private purchaseProductHandler: IPurchaseProductUseCase,
        @Inject(CancelProductHandler) private cancelProductHandler: ICancelProductUseCase
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


    @Put('/buy/cancel')
    public cancel( @Body() payload: ProductBuyDTO ) {
        return this.cancelProductHandler.handle(payload)
    }
}