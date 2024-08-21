import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { transformSort } from 'src/product/product.helper';

enum ProductStatus {
  "DRAFT",
  "INACTIVE",
  "ACTIVE",
  "ALL"
}

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  inventory: number;

  @IsNotEmpty()
  status: ProductStatus;

  @IsOptional()
  discount: number;

  @IsNotEmpty()
  description: string;
}

interface SortQueryConfig {
  // [key: string]: 1 | -1;
}

export class ProductQueryDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @Transform(({ value }) => transformSort(value))
  @IsOptional()
  sort: any = '-updatedAt';

  @IsOptional()
  search: string;

  @IsOptional()
  category: string;

  @IsOptional()
  status: 'ALL' | 'DRAFT' | 'INACTIVE' | 'ACTIVE'
}
export class ProductRestQueryDto {
  @IsOptional()
  name: string;
}
