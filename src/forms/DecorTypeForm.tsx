import { DecorType } from "../types";
import { FormWrapper } from "./FormWrapper";

type DecorTypeData = {
  decorTypes: DecorType[];
};

type DecorTypeProps = DecorTypeData & {
  updateData: (fields: DecorTypeData) => void;
};

export function DecorTypeForm({ decorTypes, updateData }: DecorTypeProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.checked) {
      updateData({
        decorTypes: [...decorTypes, DecorType[e.currentTarget.id as DecorType]],
      });
    } else {
      updateData({
        decorTypes: decorTypes.filter(
          (x) => x !== DecorType[e.currentTarget.id as DecorType]
        ),
      });
    }
  }

  return (
    <FormWrapper
      title="Rodzaj wystroju"
      description="Wybierz interesujące cię rodzaje wystroju"
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
            id={DecorType.POLISH}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
            checked={decorTypes.includes(DecorType.POLISH)}
            onChange={handleChange}
          />
          Polski
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
            id={DecorType.ITALY}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
            checked={decorTypes.includes(DecorType.ITALY)}
            onChange={handleChange}
          />
          Włoski
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
            id={DecorType.HISTORICAL}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
            checked={decorTypes.includes(DecorType.HISTORICAL)}
            onChange={handleChange}
          />
          Starodawny
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
            id={DecorType.MODERN}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
            checked={decorTypes.includes(DecorType.MODERN)}
            onChange={handleChange}
          />
          Nowoczesny
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
            id={DecorType.ORIGINAL}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
            checked={decorTypes.includes(DecorType.ORIGINAL)}
            onChange={handleChange}
          />
          Oryginalny
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
            id={DecorType.STANDARD}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
            checked={decorTypes.includes(DecorType.STANDARD)}
            onChange={handleChange}
          />
          Standardowy
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
            id={DecorType.WARM}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            type="checkbox"
            checked={decorTypes.includes(DecorType.WARM)}
            onChange={handleChange}
          />
          Przytulny
        </label>
      </div>
    </FormWrapper>
  );
}
