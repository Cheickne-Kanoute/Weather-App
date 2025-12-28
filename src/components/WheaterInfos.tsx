/**
 * WheaterInfos.tsx
 * Composant affichant les informations principales de la météo (température, ressenti, détails).
 */
import type { JSX } from "react";

type WeatherInfosProps = {
  temp: number;
  feelsLike: number;          
  condition: string;
  icon: JSX.Element;
  details: {
    label: string;
    value: string | number;
    icon: JSX.Element;
  }[]
};

const WheaterInfos = ({ temp, feelsLike, condition, icon, details }: WeatherInfosProps) => {
  return (
    <div className="card bg-base-100 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-7 flex-wrap items-center w-full md:justify-between md:h-72 justify-center">
      
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-base-content">{temp}°C</h1>
        <p className="text-sm md:text-base text-base-content">
          Feels like: <span className="font-bold">{feelsLike}°C</span>
        </p>
      </div>
      
      <div className="flex flex-col items-center">
        {icon}
        <p className="text-xl font-bold text-base-content">{condition}</p>
      </div>
      
      <div className="grid grid-cols-4 gap-5 md:grid-cols-2">
        {/* Détails météo (humidité, vent, pluie, pression) : rendu à partir du tableau `details` */}
        {details.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-2">
            {item.icon}
            <p className="text-base-content">{item.value}</p>
            <span className="text-muted">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WheaterInfos