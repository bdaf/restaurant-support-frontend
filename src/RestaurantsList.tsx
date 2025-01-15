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
  const [displayCount, setDisplayCount] = useState(DISPLAY_COUNT_STEP);
  const mapLink: string = "https://www.google.com/maps/search/?api=1&query=";

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
        Restaurajce najbardziej dopasowane do twoich preferencji
      </h2>
      <div className="restaurantList">
        {restaurants.slice(0, displayCount).map((restaurant) => (
          <div className="restaurant" key={restaurant.id}>
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
