import { useDroppable } from "@dnd-kit/core";
import { Category, Column as ColumnType } from "./types";
import { CategoryCard } from "./CategoryCard";

type ColumnProps = {
  column: ColumnType;
  categories: Category[];
};

export function Column({ column, categories }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        flexDirection: "column",
        borderRadius: ".5rem",
        padding: ".5rem",
        backgroundColor: "dimgray",
      }}
    >
      <h3 style={{ paddingBottom: ".25rem" }}>{column.title}</h3>
      <div
        ref={setNodeRef}
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        {categories.map((category) => {
          return <CategoryCard key={category.id} category={category} />;
        })}
      </div>
    </div>
  );
}
