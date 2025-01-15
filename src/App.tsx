import { useEffect, useState } from "react";
import "./App.css";
import { useMultistep } from "./hooks/useMultistep";
import { WeightForm } from "./forms/WeightForm";
import { FoodKindForm } from "./forms/FoodKindForm";
import { OpeningHoursForm } from "./forms/OpeningHoursForm";
import { MaxPriceForm } from "./forms/MaxPriceForm";
import { DecorType, FoodKindType, RestaurantScore } from "./types";
import { DecorTypeForm } from "./forms/DecorTypeForm";
import { ReastaurantsList } from "./RestaurantsList";

type InputData = {
  localizationWeight: number;
  foodKindWeight: number;
  priceWeight: number;
  hoursWeight: number;
  decorTypeWeight: number;
  openHour: string;
  closeHour: string;
  price: number;
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
  openHour: "00:00:00",
  closeHour: "23:59:00",
  price: 200,
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
      <OpeningHoursForm {...data} updateData={updateFields} />,
      <MaxPriceForm price={data.price} updateData={updateFields} />,
    ]);
  const [restaurants, setRestaurants] = useState<RestaurantScore[]>();

  useEffect(() => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
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
  }, []);

  async function onSubmit() {
    if (!isLastStep) return next();

    await fetch(
      "https://restaurant-decision-support-backend.kamil.info.pl/api/v1/restaurants/score",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        console.error(response);
      })
      .then((data: RestaurantScore[]) => {
        if (!data) return;
        setRestaurants(data.sort((a, b) => b.score - a.score));
      });
  }

  return (
    <>
      <header>
        <h1>Rekomendacja restauracji na podstawie preferencji</h1>
      </header>
      <main>
        <div className="container">
          {!restaurants ? (
            <>
              {step}
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  justifyContent: "center",
                  marginBottom: ".5rem",
                }}
              >
                {!isFirstStep && <button onClick={back}>Wróć</button>}
                <button onClick={onSubmit}>
                  {isLastStep ? "Zakończ" : "Dalej"}
                </button>
              </div>
              <div style={{ textAlign: "center" }}>
                {currentStepIndex + 1} / {steps.length}
              </div>
            </>
          ) : (
            <ReastaurantsList
              restaurants={restaurants}
              userLocation={{
                latitude: data.localizationWidth,
                longitude: data.localizationHeight,
              }}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
