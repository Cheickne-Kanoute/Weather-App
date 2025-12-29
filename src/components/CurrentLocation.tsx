/**
 * CurrentLocation.tsx
 * Composant bouton simulant la récupération de la ville courante.
 * À améliorer: utiliser l'API Geolocation pour récupérer la position réelle.
 */
import { LocateFixed } from "lucide-react";

type Props = {
  onLocate: () => void;
};

const CurrentLocation = ({ onLocate }: Props) => {

  return (
    <button
      className="btn btn-success flex items-center gap-2 rounded-full"
      onClick={onLocate}
    >
      <LocateFixed />
      Current Location
    </button>
  );
};

export default CurrentLocation;
