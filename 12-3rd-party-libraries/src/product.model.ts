import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  @IsNotEmpty()
  title: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  getInformation(): [string, string] {
    return [this.title, `$${this.price}`];
  }
}
