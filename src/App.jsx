// José Raúl Guerrero Parra
// Cargar assets y filtrado por hazard.

import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import HazardFilter from "./components/HazardFilter";
import AssetList from "./components/AssetList";
import { getRiskAssets } from "./services/riskApi";
import RiskMap from "./components/RiskMap";

function App() {

  // 1. ESTADOS DE LA APLICACION

  // Guardar los registros recibidos desde la API.
  const [assets, setAssets] = useState([]);

  // Guardar el peligro seleccionado por el usuario.
  const [selectedHazard, setSelectedHazard] = useState("All");

  // Controlar la carga de los datos.
  const [loading, setLoading] = useState(true);

  // Gestionar posibles errores HTTP.
  const [error, setError] = useState("");


  // 2. CARGAR LOS ACTIVOS DESDE LA API ASP.NET CORE

  useEffect(() => {

    async function loadAssets() {
      try {
        const data = await getRiskAssets();
        setAssets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();

  }, []);


  // 3. OBTENER LOS TIPOS DE PELIGRO DISPONIBLES
  // Obtenemos los hazards directamente de los datos de la API.
  // Set elimina los valores repetidos.

  const hazards = useMemo(() => {
    return [...new Set(assets.map((asset) => asset.hazardType))]
      .sort();
  }, [assets]);


  // 4. FILTRAR LOS ACTIVOS SEGUN EL PELIGRO SELECCIONADO

  const filteredAssets = useMemo(() => {

    // Si seleccionamos All, mostramos todos los registros.
    if (selectedHazard === "All") {
      return assets;
    }

    // En otro caso, solo los registros del peligro elegido.
    return assets.filter(
      (asset) => asset.hazardType === selectedHazard
    );

  }, [assets, selectedHazard]);


  // 5. INTERFAZ DE USUARIO

  return (
    <div className="app">

      <Header />

      <main>
        <h2>Activos y riesgos naturales</h2>

        {loading && (
          <p>Cargando datos desde la API...</p>
        )}

        {error && (
          <p role="alert">
            Error al cargar los activos: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <p>
              Entorno: {import.meta.env.VITE_ENVIRONMENT_NAME}
            </p>

            <p>
              Registros de exposición recibidos: {assets.length}
            </p>

            <HazardFilter
              selectedHazard={selectedHazard}
              onHazardChange={setSelectedHazard}
              hazards={hazards}
            />

            <p>
              Registros mostrados: {filteredAssets.length}
            </p>

            <AssetList assets={filteredAssets} />
            <RiskMap assets={filteredAssets} />
          </>
        )}
      </main>

    </div>
  );
}

export default App;
