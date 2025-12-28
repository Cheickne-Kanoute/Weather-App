/**
 * NextDays.tsx
 * Composant listant la prévision quotidienne (5 jours).
 */
import { CloudSunRain } from "lucide-react";


type ForecastDay = {
    temp: number;
    day: string;
    date: string;
};

type NextDaysProps = {
    forecast: ForecastDay[];
};

const NextDays = ({ forecast }: NextDaysProps) => {
    return (
        <div className="card bg-base-100 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 md:gap-2 items-start w-full md:h-72 justify-center">
            <h2 className="text-2xl font-bold text-base-content">5 Days Forecast:</h2>
            <div className="w-full">
                <ul className="w-full">
                    {
                        // Pour chaque jour de la prévision, on affiche la température, le jour et la date
                        forecast.map((day, index) => (
                            <li className="flex items-center justify-between gap-4 w-full text-lg md:text-xl font-semibold py-2" key={index}>
                                <div className="flex items-center gap-4"><CloudSunRain className="text-amber-400"/></div>
                                <div className="font-bold">{day.temp}°C</div>
                                <div className="text-sm md:text-base text-muted">{day.day}, {day.date}</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default NextDays