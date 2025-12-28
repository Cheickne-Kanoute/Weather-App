/**
 * Hourly.tsx
 * Composant affichant les prévisions horaires sous forme de cards déroulantes.
 */
import type { JSX } from "react";

type HourlyItem = {
  time: string;
  temp: number; 
  windSpeed: string; 
  icon: JSX.Element;
  windDir: JSX.Element;
};

type HourlyProps = {
  hours: HourlyItem[];
};

const Hourly = ({hours}: HourlyProps) => {
  return (
    <div className="card bg-base-100 rounded-2xl shadow-2xl p-6 w-full md:h-72 justify-center">
      <h1 className="text-2xl font-bold text-base-content">Hourly Forecast:</h1>
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-5 md:gap-5 md:overflow-visible mt-4">
        {/* Map des heures : on affiche pour chaque tranche horaire le temps, l'icône météo et la direction du vent */}
        {hours.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 font-bold text-lg md:text-xl items-center justify-center shadow-lg p-3 rounded-xl min-w-30 bg-primary text-primary-content"
          >
            <h2>{hour.time}</h2>
            <p>{hour.temp}°C</p>
            {hour.icon}
            <p>{hour.windSpeed}</p>
            {hour.windDir}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hourly