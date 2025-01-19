export type Column = {
  id: number;
  title?: string;
};

export type Category = {
  id: number;
  tag: string;
  name: string;
  weight: number;
};

export type RestaurantScore = {
  ID: number;
  score: number;
  name: string;
  openHour: string;
  closeHour: string;
  decorTypes: DecorType[];
  foodKinds: FoodKindType[];
  priceMin: number;
  priceMax: number;
  localizationHeight: number;
  localizationWidth: number;
  prizeComment: string;
  hourComment: string;
  foodKindComment: string;
  decorTypeComment: string;
  localizationComment: string;
};

export enum FoodKindType {
  ASIAN = "ASIAN",
  POLISH = "POLISH",
  SOPHISTICATED = "SOPHISTICATED",
  BURGER = "BURGER",
  TATAR = "TATAR",
  HUNGARY = "HUNGARY",
  PIEROGI = "PIEROGI",
  STEAK = "STEAK",
  PIZZA = "PIZZA",
}

export enum DecorType {
  POLISH = "POLISH",
  ITALY = "ITALY",
  STANDARD = "STANDARD",
  WARM = "WARM",
  HISTORICAL = "HISTORICAL",
  MODERN = "MODERN",
  ORIGINAL = "ORIGINAL",
}
