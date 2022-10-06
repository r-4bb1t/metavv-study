export interface BookType {
  type: "book";
  id: number;
  name: string;
  price: number;
  author: string;
}

export interface MealType {
  type: "meal";
  id: number;
  name: string;
  price: number;
  restaurant: string;
}
