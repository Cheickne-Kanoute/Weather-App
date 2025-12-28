/**
 * ToogleMode.tsx
 * Composant simple pour basculer entre mode clair et sombre.
 */
import { useEffect, useState } from "react"

const ToggleMode = () => {

  const [theme, setTheme] = useState("light");

  // Met à jour l'attribut `data-theme` du document pour que Tailwind/DaisyUI applique le bon thème
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="btn"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  )
}

export default ToggleMode;