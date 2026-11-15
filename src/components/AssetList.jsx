// José Raúl Guerrero Parra
// Representar el listado de activos y sus riesgos.
function AssetList({ assets }) {
  // Formatear los valores economicos.
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(value);
  };
  // Mensaje si el filtro no encuentra registros.
  if (assets.length === 0) {
    return <p>No se encontraron activos para el peligro seleccionado.</p>;
  }
  return (
    <section className="asset-list">
      <h2>Listado de activos</h2>

      {assets.map((asset) => (
        <article
          key={`${asset.assetId}-${asset.hazardType}`}
          className="asset-card"
        >
          <h3>{asset.name}</h3>
          <p><strong>Peligro:</strong> {asset.hazardType}</p>
          <p><strong>Severidad:</strong> {asset.severityLevel}</p>
          <p><strong>Región:</strong> {asset.regionCode}</p>
          <p><strong>Valor:</strong> {formatCurrency(asset.assetValue)}</p>
          <p><strong>RiskScore:</strong> {asset.riskScore}</p>
        </article>
      ))}
    </section>
  );
}
export default AssetList;
