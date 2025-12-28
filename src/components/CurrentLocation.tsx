/**
 * CurrentLocation.tsx
 * Composant bouton simulant la récupération de la ville courante.
 * À améliorer: utiliser l'API Geolocation pour récupérer la position réelle.
 */
import { LocateFixed } from "lucide-react";

type Props = {
  setCity: (city: string) => void;
};

const CurrentLocation = ({ setCity }: Props) => {
  /**
   * getCity
   * Placeholder qui retourne une ville fixe. Remplacer par une vraie géolocalisation.
   */
  function getCity() {
    return "Bamako";
  }

  return (
    <button
      className="btn btn-success flex items-center gap-2 rounded-full"
      onClick={() => setCity(getCity())}
    >
      <LocateFixed />
      Current Location
    </button>
  );
};

export default CurrentLocation;
