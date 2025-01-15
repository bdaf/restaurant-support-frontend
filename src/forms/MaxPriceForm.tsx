import { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { Range } from "react-range";

type MaxPriceFormProps = {
  price: number;
  updateData: (fields: Partial<{ price: number }>) => void;
};

const MIN = 10;
const MAX = 200;

export function MaxPriceForm({ price, updateData }: MaxPriceFormProps) {
  const [value, setValue] = useState<number>(price);

  const handleChange = (newValue: number[]) => {
    setValue(newValue[0]);
    updateData({ price: newValue[0] });
  };

  return (
    <FormWrapper
      title="Średnia cena dania"
      description="Wybierz uśrednioną cenę dania, która Cię interesuje"
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
          Uśredniona cena: {value} zł
        </div>
      </div>
    </FormWrapper>
  );
}
