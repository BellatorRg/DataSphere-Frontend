// José Raúl Guerrero Parra
// Mapa geográfico de activos mediante React Leaflet y OpenStreetMap.
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RiskMap({ assets }) {
  // 1. AGRUPAR REGISTROS POR ACTIVO
  // Un activo puede tener varios hazards pero una sola ubicación.
  // Evitar duplicados y agrupar los hazards en un array para cada activo.

  const uniqueAssets = useMemo(() => {
    const grouped = new Map();

    assets.forEach((asset) => {

      // Comprobar que las coordenadas sean válidas.
      if (
        !Number.isFinite(asset.latitude) ||
        !Number.isFinite(asset.longitude) ||
        asset.latitude < -90 ||
        asset.latitude > 90 ||
        asset.longitude < -180 ||
        asset.longitude > 180
      ) {
        return;
      }

      if (!grouped.has(asset.assetId)) {
        grouped.set(asset.assetId, {
          ...asset,
          hazards: [asset.hazardType],
        });
      } else {
        const existing = grouped.get(asset.assetId);

        if (!existing.hazards.includes(asset.hazardType)) {
          existing.hazards.push(asset.hazardType);
        }
      }
    });

    return [...grouped.values()];
  }, [assets]);

  // 2. CONFIGURACION DEL MAPA
  // Centro aproximado para visualizar los activos de Florida.
  const mapCenter = [27.1, -80.7];

  return (
    <section className="risk-map">
      <h2>Mapa geográfico de riesgos</h2>

      <p>
        Activos geolocalizados: {uniqueAssets.length}
      </p>

      <MapContainer
        center={mapCenter}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "450px", width: "100%" }}
      >

        {/* 3. CARTOGRAFIA DE OPENSTREETMAP */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 4. MARCADORES DE LOS ACTIVOS FILTRADOS */}

        {uniqueAssets.map((asset) => (
          <Marker
            key={asset.assetId}
            position={[asset.latitude, asset.longitude]}
          >
            <Popup>
              <strong>{asset.name}</strong>
              <p>Región: {asset.regionCode}</p>
              <p>Peligros: {asset.hazards.join(", ")}</p>
              <p>Valor: {asset.assetValue.toLocaleString("es-ES")} €</p>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      {uniqueAssets.length === 0 && (
        <p>No hay activos geolocalizados para mostrar.</p>
      )}

    </section>
  );
}

export default RiskMap;
