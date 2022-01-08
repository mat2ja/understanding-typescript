// import _ from 'lodash';
// declare var GLOBAL_VAR: any;
// console.log(_.shuffle([1, 2, 3, 4, 5, 6]));
// console.log(GLOBAL_VAR);

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from './product.model';

const products = [
  { title: 'Meditations', price: 9.99 },
  { title: 'Mastering Ethereum', price: 39.99 },
];

// const p1 = new Product('Ego is the enemy', 13.99);
// console.log(p1.getInformation());

// const loadedProducts = products.map((p) => new Product(p.title, p.price));

const loadedProducts = plainToInstance(Product, products);

loadedProducts.forEach((product) => {
  console.log(product.getInformation());
});

const p2 = new Product('', 13.99);
validate(p2).then((errors) => {
  if (errors.length > 0) {
    console.log(errors);
  } else {
    p2.getInformation();
  }
});
