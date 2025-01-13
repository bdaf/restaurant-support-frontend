import { useDraggable } from "@dnd-kit/core";
import { Category } from "./types";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: category.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="categoryBox"
      style={style}
    >
      <h3 style={{ fontWeight: "normal", userSelect: "none" }}>
        {category.name}
      </h3>
    </div>
  );
}
