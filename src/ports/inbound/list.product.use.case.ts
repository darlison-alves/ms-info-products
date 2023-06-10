import { Product } from "src/domain/entities/product.entity";

export interface IListProductUseCase {
    handle(): Promise<Product[]>
}