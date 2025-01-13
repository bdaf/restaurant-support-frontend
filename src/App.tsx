import { useState } from "react";
import "./App.css";
import { useMultistep } from "./hooks/useMultistep";
import { WeightForm } from "./forms/WeightForm";
import { FoodKindForm } from "./forms/FoodKindForm";
import { OpeningHoursForm } from "./forms/OpeningHoursForm";
import { MaxPriceForm } from "./forms/MaxPriceForm";

type InputData = {
  localizationWeight: number;
  foodKindWeight: number;
  priceWeight: number;
  hoursWeight: number;
  decorTypeWeight: number;
  openingHours: [string, string];
  maxPrice: number;
};

const INITIAL_DATA: InputData = {
  localizationWeight: 1,
  foodKindWeight: 1,
  priceWeight: 1,
  hoursWeight: 1,
  decorTypeWeight: 1,
  openingHours: ["00:00:00", "23:59:00"],
  maxPrice: 200,
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<InputData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, next, back } =
    useMultistep([
      <WeightForm {...data} updateData={updateFields} />,
      <FoodKindForm />,
      <OpeningHoursForm openingHours={data.openingHours} updateData={updateFields} />,
      <MaxPriceForm maxPrice={data.maxPrice} updateData={updateFields} />,
    ]);

  return (
    <>
      <header>
        <h1>Rekomendacja restauracji na podstawie preferencji</h1>
      </header>
      <main>
        <div className="container">
          <div>
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div style={{ display: "flex", gap: ".5rem" }}>
            {!isFirstStep && <button onClick={back}>Wróć</button>}
            <button onClick={next}>{isLastStep ? "Zakończ" : "Dalej"}</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
