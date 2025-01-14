import { useEffect, useState } from "react";
import "./App.css";
import { useMultistep } from "./hooks/useMultistep";
import { WeightForm } from "./forms/WeightForm";
import { FoodKindForm } from "./forms/FoodKindForm";
import { OpeningHoursForm } from "./forms/OpeningHoursForm";
import { MaxPriceForm } from "./forms/MaxPriceForm";
import { DecorType, FoodKindType } from "./types";
import { DecorTypeForm } from "./forms/DecorTypeForm";

type InputData = {
  localizationWeight: number;
  foodKindWeight: number;
  priceWeight: number;
  hoursWeight: number;
  decorTypeWeight: number;
  openingHours: [string, string];
  maxPrice: number;
  foodKinds: FoodKindType[];
  decorTypes: DecorType[];
  localizationHeight: number;
  localizationWidth: number;
};

const INITIAL_DATA: InputData = {
  localizationWeight: 1,
  foodKindWeight: 1,
  priceWeight: 1,
  hoursWeight: 1,
  decorTypeWeight: 1,
  openingHours: ["00:00:00", "23:59:00"],
  maxPrice: 200,
  foodKinds: [],
  decorTypes: [],
  localizationHeight: 0,
  localizationWidth: 0,
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
      <FoodKindForm {...data} updateData={updateFields} />,
      <DecorTypeForm {...data} updateData={updateFields} />,
      <OpeningHoursForm
        openingHours={data.openingHours}
        updateData={updateFields}
      />,
      <MaxPriceForm maxPrice={data.maxPrice} updateData={updateFields} />,
    ]);

  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          updateFields({
            localizationWidth: latitude,
            localizationHeight: longitude,
          });
        },
        // if there was an error getting the users location
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  });

  async function onSubmit() {
    if (!isLastStep) return next();

    await fetch(
      "https://restaurant-decision-support-backend.kamil.info.pl/api/v1/restaurants/score",
      {
        method: "POST",
        mode: "no-cors",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(data),
      }
    ).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <header>
        <h1>Rekomendacja restauracji na podstawie preferencji</h1>
      </header>
      <main>
        <div className="container">
          {step}
          <div
            style={{ display: "flex", gap: ".5rem", justifyContent: "center" }}
          >
            {!isFirstStep && <button onClick={back}>Wróć</button>}
            <button onClick={onSubmit}>
              {isLastStep ? "Zakończ" : "Dalej"}
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            {currentStepIndex + 1} / {steps.length}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
