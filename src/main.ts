import { NestFactory } from '@nestjs/core';
import { ProductRepository } from './adapters/repositories/product.repository';
import { AppModule } from './app.module';

const { PORT } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const productRepository = app.get(ProductRepository);

  try {
    await productRepository.save({
      _id: "987654",
      code: "COURSE_ABCD",
      name: "ABCD"
    })

    await productRepository.save({
      _id: "123456",
      code: "COURSE_XYZ",
      name: "XYZ"
    })
  } catch (error) {
    console.log('.....')
  }

  await app.listen(PORT);
}
bootstrap();
