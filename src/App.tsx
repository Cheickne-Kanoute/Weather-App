/**
 * App.tsx
 *
 * Entrypoint de l'application météo.
 * - Gère l'état global (ville, météo, prévisions, chargement, erreurs)
 * - Appelle l'API OpenWeatherMap pour récupérer les données
 * - Contient des utilitaires pour formater les prévisions
 */
import { useState, useEffect } from 'react'
import './App.css'
import CurrentLocation from './components/CurrentLocation' 
import Hourly from './components/Hourly'
import Loader from './components/Loader'
import LocationName from './components/LocationName'
import NextDays from './components/NextDays'
import SearchBox from './components/SearchBox'
import ToogleMode from './components/ToogleMode'
import WheaterInfos from './components/WheaterInfos'
import { Cloud, CloudHail, CloudLightning, CloudRain, CloudSnow, Gauge, MoveUp, Sun, Waves, Wind } from 'lucide-react'

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourly, setHourly] = useState<any[]>([]);
  const API_KEY = "e92e7025f4dc85abbc50dee6fcd1d183"


  /**
   * getCity
   * Fonction utilitaire retournant la ville par défaut utilisée au démarrage.
   * À remplacer par une géolocalisation ou une logique plus robuste.
   */
  function getCity() {
    return "maroc";
  }

  /**
   * getWeatherIcon
   * Renvoie un composant icône correspondant à la condition météo principale.
   * Paramètres: main - chaîne représentant la condition reçue depuis l'API (Clear, Clouds, Rain, ...)
   */
  function getWeatherIcon(main: string) {
    switch (main) {
      case "Clear": 
        return <Sun className="h-8 w-8 text-yellow-400" />;
      case "Clouds":
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case "Rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "Snow":
        return <CloudSnow className="h-8 w-8 text-blue-100" />;
      case "Hail":
        return <CloudHail className="h-8 w-8 text-blue-300" />;
      case "Thunderstorm":
        return <CloudLightning className="h-8 w-8 text-purple-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-400" />;
    }
  }

  // Effet: initialisation de la ville par défaut au montage du composant
  useEffect(() => {
    const defaultCity = getCity();
    setCity(defaultCity);
  }, []);

  // Effet: à chaque changement de `city`, déclenche la récupération de la météo et des prévisions
  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError("");

    fetchWeather(city);
    fetchForecast(city)
  }, [city]);

  // search: fonction placeholder destinée à étendre la logique de recherche (non utilisée pour l'instant)
  const search = () => {
    console.log('recherche...')
  }

  /**
   * fetchWeather
   * Récupère les données météo actuelles pour une ville donnée.
   * - city: nom de la ville à rechercher
   * Gère les erreurs réseau et met à jour l'état `weather` et `error`.
   */
  async function fetchWeather(city: string) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        setError("Ville introuvable");
        setWeather(null);
        return;
      }

      setWeather(data);
    } catch (error) {
      setError("Erreur réseau");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * fetchForecast
   * Récupère les prévisions horaires (forecast) pour une ville.
   * - city: nom de la ville
   * Met à jour `hourly` et calcule une prévision quotidienne simplifiée pour `forecast`.
   */
  async function fetchForecast(city: string) {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
      const data = await res.json();

      if (data.cod !== "200") {
        setError("Prévisions introuvables");
        return;
      }

      setHourly(data.list);

      const forecastData = getDailyForecast(data.list).map(item => ({
        temp: Math.round(item.main.temp),
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      }));

      setForecast(forecastData);

    } catch (err) {
      setError("Erreur réseau");
      console.log(err)
    }
  }

  /**
   * WindIcon
   * Retourne un composant d'icône tourné selon la direction du vent (deg).
   */
  function WindIcon(deg: number) {
    return (
      <MoveUp
        className="h-10 w-10 text-black"
        style={{ transform: `rotate(${deg}deg)` }}
      />
    );
  }

  /**
   * getDailyForecast
   * Convertit la liste de prévisions horaires en une prévision par jour en prenant
   * la première occurrence de chaque date (approche simple pour l'exemple).
   */
  function getDailyForecast(data: unknown[]) {
    const dailyMap = new Map<string, any>();
    data.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
      if (!dailyMap.has(date)) {
        dailyMap.set(date, item);
      }
    });
    return Array.from(dailyMap.values()).slice(0, 5);
  }

  useEffect(() => {
    if (weather) {
      console.log("Weather mis à jour :", weather);
    }
  }, [weather]);

  return (
    <div className='min-h-screen bg-base-200 p-5 flex flex-col items-center'>
      <header className='flex items-center md:justify-between gap-3 flex-wrap justify-center w-full max-w-7xl'>
        <ToogleMode />
        <SearchBox   city={city} setCity={setCity}/>
        <CurrentLocation setCity={setCity} />
      </header>
      {loading && <Loader />}
      {error && <p className="text-error text-center mt-10">{error}</p>}
      <div className='mt-6 grid grid-cols-1 w-full gap-5 md:grid-cols-3 max-w-7xl'>
        <div className='md:col-span-1'>{!loading && !error && weather && <LocationName city={weather.name} dt={weather.dt} timezone={weather.timezone} />}</div>
        <div className='md:col-span-2'>{!loading && !error && weather && <WheaterInfos
          temp={Math.round(weather.main.temp)}
          feelsLike={Math.round(weather.main.feels_like)}
          condition={weather.weather[0].main}
          icon={weather.weather[0].main === "Clear" ? <Sun className="font-bold h-24 w-24 text-warning" /> : <CloudHail className="font-bold h-24 w-24 text-blue-400" />}
          details={[
            {
              label: "Humidity",
              value: `${weather.main.humidity}%`,
              icon: <Waves className="h-10 w-10" />
            },
            {
              label: "Wind",
              value: `${Math.round(weather.wind.speed * 3.6)} km/h`,
              icon: <Wind className="h-10 w-10" />
            },
            {
              label: "Rain",
              value: weather.rain?.["1h"]
                ? `${weather.rain["1h"]} mm`
                : "0 mm",
              icon: <CloudHail className="h-10 w-10" />
            },
            {
              label: "Pressure",
              value: `${weather.main.pressure} hPa`,
              icon: <Gauge className="h-10 w-10" />
            }
          ]}
        />
        }</div>
        <div className='md:col-span-1'>{!loading && !error && weather && <NextDays forecast={forecast} />}</div>
        <div className="md:col-span-2">
          {!loading && !error && hourly.length > 0 && (
            <Hourly
              hours={hourly.slice(0, 5).map(item => ({
                id: item.dt,
                time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit"
                }),
                temp: Math.round(item.main.temp),
                windSpeed: `${Math.round(item.wind.speed * 3.6)} km/h`,
                icon: getWeatherIcon(item.weather[0].main),
                windDir: WindIcon(item.wind.deg)
              }))}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App