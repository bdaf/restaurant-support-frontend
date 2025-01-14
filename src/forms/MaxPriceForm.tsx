import { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { Range } from "react-range";

type MaxPriceFormProps = {
  maxPrice: number;
  updateData: (fields: Partial<{ maxPrice: number }>) => void;
};

const MIN = 10;
const MAX = 200;

export function MaxPriceForm({ maxPrice, updateData }: MaxPriceFormProps) {
  const [value, setValue] = useState<number>(maxPrice);

  const handleChange = (newValue: number[]) => {
    setValue(newValue[0]);
    updateData({ maxPrice: newValue[0] });
  };

  return (
    <FormWrapper
      title="Maksymalna cena dania"
      description="Wybierz maksymalną cenę dania, która Cię interesuje"
    >
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={[value]}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                borderRadius: "3px",
                width: "80%",
                background: `linear-gradient(to right, #007bff ${
                  ((value - MIN) / (MAX - MIN)) * 100
                }%, #ddd ${((value - MIN) / (MAX - MIN)) * 100}%)`,
                position: "relative",
                margin: "1rem auto",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "24px",
                width: "24px",
                background: "#ffffff",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}
        />
        <div
          style={{
            marginTop: "1rem",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Maksymalna cena: {value} zł
        </div>
      </div>
    </FormWrapper>
  );
}
