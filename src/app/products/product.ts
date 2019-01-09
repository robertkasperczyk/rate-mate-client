import {Comment} from './comment';

export class Product {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  powerRating: number;
  dustRating: number;
  tasteRating: number;
  comments: Array<Comment>;
}
