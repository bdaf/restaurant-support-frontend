import { useState } from "react";
import { RestaurantScore } from "./types";
import { getDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";

type RestaurantsListProps = {
  restaurants: RestaurantScore[];
  userLocation: GeolibInputCoordinates;
};

const DISPLAY_COUNT_STEP = 3;

export function ReastaurantsList({
  restaurants,
  userLocation,
}: RestaurantsListProps) {
  const mapLink: string = "https://www.google.com/maps/search/?api=1&query=";
  const [displayCount, setDisplayCount] = useState(DISPLAY_COUNT_STEP);
  const [popOverID, setPopOverID] = useState<number>();

  function getGradientColor(percentage: number) {
    percentage = Math.min(100, Math.max(0, percentage));

    let red: number, green: number;
    if (percentage < 50) {
      red = 255;
      green = Math.round(255 * (percentage / 50));
    } else {
      green = 255;
      red = Math.round(255 - 255 * ((percentage - 50) / 50));
    }

    return `rgb(${red}, ${green}, 0)`;
  }

  function togglePopOver(id: number) {
    if (id !== popOverID) {
      setPopOverID(id);
      return;
    }
    setPopOverID(undefined);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Restauracje najbardziej dopasowane do twoich preferencji
      </h2>
      <div className="restaurantList">
        {restaurants.slice(0, displayCount).map((restaurant) => (
          <div
            className="restaurant"
            data-id={restaurant.ID}
            onClick={() => togglePopOver(restaurant.ID)}
            key={restaurant.ID}
          >
            <div>
              <a
                href={`${mapLink}${restaurant.localizationHeight}%2C${restaurant.localizationWidth}`}
                target="_blank"
              >
                {restaurant.name}
              </a>
              {` - ${
                Math.round(
                  (getDistance(userLocation, {
                    latitude: restaurant.localizationHeight,
                    longitude: restaurant.localizationWidth,
                  }) /
                    1000 +
                    Number.EPSILON) *
                    100
                ) / 100
              } km`}
            </div>
            <div
              style={{
                color: getGradientColor(restaurant.score * 100),
              }}
            >
              {Math.round((restaurant.score * 100 + Number.EPSILON) * 100) /
                100}
              %
            </div>
            {popOverID === restaurant.ID && (
              <div className="popOver">
                <p>
                  <div style={{ fontWeight: "bold" }}>Lokalizacja: </div>
                  <div style={{ fontStyle: "italic" }}>
                    {restaurant.localizationComment}
                  </div>
                </p>
                <p>
                  <div style={{ fontWeight: "bold" }}>Rodzaj jedzenia: </div>
                  <div style={{ fontStyle: "italic" }}>
                    {restaurant.foodKindComment}
                  </div>
                </p>
                <p>
                  <div style={{ fontWeight: "bold" }}>Rodzaj wystroju: </div>
                  <div style={{ fontStyle: "italic" }}>
                    {restaurant.decorTypeComment}
                  </div>
                </p>
                <p>
                  <div style={{ fontWeight: "bold" }}>Godziny otwarcia: </div>
                  <div style={{ fontStyle: "italic" }}>
                    {restaurant.hourComment}
                  </div>
                </p>
                <p>
                  <div style={{ fontWeight: "bold" }}>Średnie cena: </div>
                  <div style={{ fontStyle: "italic" }}>
                    {restaurant.prizeComment}
                  </div>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => setDisplayCount((prev) => prev + DISPLAY_COUNT_STEP)}
      >
        Załaduj kolejne wyniki
      </button>
    </div>
  );
}
