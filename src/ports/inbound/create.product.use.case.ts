import { ProductDTO } from "src/domain/dtos/product.dto";
import { Product } from "src/domain/entities/product.entity";

export interface ICreateProductUseCase {
    handle(productDTO: ProductDTO): Promise<Product>
}