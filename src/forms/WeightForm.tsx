import { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { Category, Column as ColumnType } from "../types";
import { Column } from "../Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { getFieldName } from "../util";

type WeightData = {
  localizationWeight: number;
  foodKindWeight: number;
  priceWeight: number;
  hoursWeight: number;
  decorTypeWeight: number;
};

type WeightFormProps = WeightData & {
  updateData: (fields: Partial<WeightData>) => void;
};

const COLUMNS: ColumnType[] = [
  { id: 1, title: "Bardzo istotne - 5" },
  { id: 0.75, title: "Istotne - 4" },
  { id: 0.5, title: "Średnio istotne - 3" },
  { id: 0.25, title: "Mało istotne - 2" },
  { id: 0, title: "Nieistotne - 1" },
];

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    tag: "foodKindWeight",
    name: "Rodzaj jedzenia",
    weight: 1,
  },
  {
    id: 2,
    tag: "localizationWeight",
    name: "Lokalizacja",
    weight: 1,
  },
  {
    id: 3,
    tag: "hoursWeight",
    name: "Godziny otwarcia",
    weight: 1,
  },
  {
    id: 4,
    tag: "priceWeight",
    name: "Ceny",
    weight: 1,
  },
  {
    id: 5,
    tag: "DecorTypeWeight",
    name: "Rodzaj wystroju",
    weight: 1,
  },
];
export function WeightForm({
  localizationWeight,
  foodKindWeight,
  priceWeight,
  hoursWeight,
  decorTypeWeight,
  updateData,
}: WeightFormProps) {
  const [categories, setCategories] = useState<Category[]>(() => {
    let oldWeight = INITIAL_CATEGORIES.find(
      (c) => c.tag === getFieldName<WeightData>("localizationWeight")
    );
    if (oldWeight) oldWeight.weight = localizationWeight;
    oldWeight = INITIAL_CATEGORIES.find(
      (c) => c.tag === getFieldName<WeightData>("foodKindWeight")
    );
    if (oldWeight) oldWeight.weight = foodKindWeight;
    oldWeight = INITIAL_CATEGORIES.find(
      (c) => c.tag === getFieldName<WeightData>("priceWeight")
    );
    if (oldWeight) oldWeight.weight = priceWeight;
    oldWeight = INITIAL_CATEGORIES.find(
      (c) => c.tag === getFieldName<WeightData>("hoursWeight")
    );
    if (oldWeight) oldWeight.weight = hoursWeight;
    oldWeight = INITIAL_CATEGORIES.find(
      (c) => c.tag === getFieldName<WeightData>("decorTypeWeight")
    );
    if (oldWeight) oldWeight.weight = decorTypeWeight;
    return INITIAL_CATEGORIES;
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const categoryId = active.id as number;
    const newWeight = over.id as Category["weight"];

    setCategories(() =>
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              weight: newWeight,
            }
          : category
      )
    );

    updateData({
      [INITIAL_CATEGORIES.find((c) => c.id === categoryId)?.tag ?? ""]:
        newWeight,
    });
  }

  return (
    <FormWrapper
      title="Co uważasz za najbardziej istotne?"
      description="Posortuj kategorie według własnego uznania."
    >
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  categories={categories.filter(
                    (category) => category.weight === column.id
                  )}
                />
              );
            })}
          </DndContext>
        </div>
      </div>
    </FormWrapper>
  );
}
