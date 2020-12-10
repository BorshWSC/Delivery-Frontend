import {Image} from './image';
import {Category} from "./category";

export interface Dish {
  id: number;
  name: string;
  cost: number;
  weight: number;
  description: string;
  image: Image;
  category: Category;
}
