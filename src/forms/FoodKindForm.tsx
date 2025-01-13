import { FormWrapper } from "./FormWrapper";

type FoodKindFormProps = {
  updateData: () => void;
};

enum FoodKindType {
  ASIAN = "ASIAN",
  POLISH = "POLISH",
  SOPHISTICATED = "SOPHISTICATED",
  BURGER = "BURGER",
  TATAR = "TATAR",
  HUNGARY = "HUNGARY",
  PIEROGI = "PIEROGI",
  STEAK = "STEAK",
}

export function FoodKindForm({ updateData }: FoodKindFormProps) {
  return (
    <FormWrapper
      title="Rodzaj jedzenia"
      description="Wybierz interesujące cię rodzaje jedzenie"
    >
      <div
        style={{
          padding: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          justifyItems: "center",
          rowGap: "1rem",
        }}
      >
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.ASIAN}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Azjatyckie
        </label>
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.POLISH}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Polskie
        </label>
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.SOPHISTICATED}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Wykwintne
        </label>
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.BURGER}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Burgery
        </label>
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.TATAR}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Tatar
        </label>
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.HUNGARY}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Węgierskie
        </label>
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.PIEROGI}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Pierogi
        </label>
        <label
          style={{
            width: "min-content",
            display: "flex",
            flexDirection: "column-reverse",
            gap: ".25rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            id={FoodKindType.STEAK}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
          />
          Steki
        </label>
      </div>
    </FormWrapper>
  );
}
