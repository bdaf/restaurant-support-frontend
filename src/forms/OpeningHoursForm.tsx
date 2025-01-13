import { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { Range } from "react-range";

type OpeningHoursFormProps = {
    openingHours: [string, string];
    updateData: (fields: Partial<{ openingHours: [string, string] }>) => void;
};

const MIN = 0;
const MAX = 1439;

export function OpeningHoursForm({
    openingHours,
    updateData,
}: OpeningHoursFormProps) {
    const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const minutesToTime = (minutes: number) => {
        const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
        const mm = String(minutes % 60).padStart(2, "0");
        return `${hh}:${mm}:00`;
    };

    const minutesToTimeWithoutSeconds = (minutes: number) => {
        const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
        const mm = String(minutes % 60).padStart(2, "0");
        return `${hh}:${mm}`;
    };

    const initialValues = [
        timeToMinutes(openingHours[0]),
        timeToMinutes(openingHours[1]),
    ];

    const [values, setValues] = useState<number[]>(initialValues);

    const handleChange = (newValues: number[]) => {
        setValues(newValues);
        updateData({
            openingHours: [minutesToTime(newValues[0]), minutesToTime(newValues[1])],
        });
    };

    return (
        <FormWrapper
            title="Godziny otwarcia"
            description="Wybierz zakres godzin otwarcia restauracji, który Cię interesuje"
        >
            <div style={{ padding: "1rem", textAlign: "center" }}>
                <Range
                    step={1}
                    min={MIN}
                    max={MAX}
                    values={values}
                    onChange={handleChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            key="track"
                            style={{
                                ...props.style,
                                height: "6px",
                                borderRadius: "3px",
                                width: "80%",
                                background: `linear-gradient(to right, #ddd ${values[0] / MAX * 100}%, #007bff ${values[0] / MAX * 100}%, #007bff ${values[1] / MAX * 100}%, #ddd ${values[1] / MAX * 100}%)`,
                                position: "relative",
                                margin: "1rem auto",
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props, index }) => (
                        <div
                            {...props}
                            key={`thumb-${index}`}
                            style={{
                                ...props.style,
                                height: "24px",
                                width: "24px",
                                background: "#ffffff",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    )}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "80%",
                        margin: "0 auto",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    <span>Otwarcie: {minutesToTimeWithoutSeconds(values[0])}</span>
                    <span>Zamknięcie: {minutesToTimeWithoutSeconds(values[1])}</span>
                </div>
            </div>
        </FormWrapper>
    );
}