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
