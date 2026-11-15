// José Raúl Guerrero Parra
// Componente para seleccionar el hazard que se quiera filtrar. 

function HazardFilter({ selectedHazard, onHazardChange, hazards }) {
  return (
    <div className="hazard-filter">
      <label htmlFor="hazard-select">
        Filtrar activos por peligro natural:
      </label>

      <select
        id="hazard-select"
        value={selectedHazard}
        onChange={(event) => onHazardChange(event.target.value)}
      >
        <option value="All">Todos los peligros</option>

        {hazards.map((hazard) => (
          <option key={hazard} value={hazard}>
            {hazard}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HazardFilter;
