import { Prop, Schema } from "@nestjs/mongoose";
import { ProductDTO } from "../dtos/product.dto";

@Schema()
export class Product {

    @Prop({ _id: true })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    code: string;

    public static of(productDTO: ProductDTO) {
        const product = new Product();
        product._id = productDTO.id;
        product.code = productDTO.code;
        product.name = productDTO.name;
        return product;
    }
}