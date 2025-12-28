/**
 * SearchBox.tsx
 * Composant de recherche permettant à l'utilisateur de saisir une ville.
 * Props:
 * - city: valeur actuelle de la ville
 * - setCity: fonction pour mettre à jour la ville sélectionnée
 */
import { Search } from "lucide-react"
import { useState } from "react";

type SearchProps = {
  city: string;
  setCity: (city: string) => void;
}

const SearchBox = ({ city, setCity }: SearchProps) => {
  // Le champ input est initialisé avec la valeur `city` passée en props
  const [input, setInput] = useState(city);

  // handleSubmit: empêche le comportement par défaut du formulaire et
  // envoie la recherche si le champ n'est pas vide.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setCity(input.trim());
  }

  return (
    <div className="flex items-center gap-3 rounded-full border p-3 w-full md:w-2/3 lg:w-1/2 bg-base-200 shadow-sm justify-center">
      <span className="text-2xl text-base-content opacity-70"><Search /></span>
      <input type="text" placeholder="Search for your preferred city..."
        required
        className="w-full bg-transparent focus:outline-0 placeholder:text-muted"
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleSubmit}>Search</button>
    </div>
  )
}

export default SearchBox