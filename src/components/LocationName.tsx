/**
 * LocationName.tsx
 * Composant affichant le nom de la ville et l'heure locale calculée à partir du timestamp et du timezone renvoyés par l'API.
 */
type LocationNameProps = {
    city: string;
    dt: number;
    timezone: number;
};

const LocationName = (props: LocationNameProps) => {
    // L'API retourne `dt` (timestamp UTC) et `timezone` (décalage en secondes), on calcule
    // l'heure locale en ajoutant ces deux valeurs puis en convertissant en Date.
    const local = new Date((props.dt + props.timezone) * 1000);
    const hours = local.getUTCHours().toString().padStart(2, '0');
    const minutes = local.getUTCMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    const dateString = local.toUTCString();

    return (
        <div className="card bg-base-100 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 items-start justify-center md:items-center w-full h-fit md:h-72">
            <h2 className="text-4xl font-semibold text-base-content">{props.city}</h2>
            <div className="flex flex-col justify-center items-start md:items-center">
                <h1 className="font-bold text-5xl">{timeString}</h1>
                <span className="text-sm text-muted">{dateString}</span>
            </div>
        </div>
    )
}

export default LocationName