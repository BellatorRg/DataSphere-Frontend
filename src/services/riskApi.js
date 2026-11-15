// José Raúl Guerrero Parra
// Servicio de comunicación entre React y la API ASP.NET Core.

// Obtener los activos y riesgos desde la API.
export async function getRiskAssets() {

  // Obtener la URL de la API desde las variables de entorno.
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("URL API configurada:", apiUrl);
  // Realizar la petición HTTP GET.
  const response = await fetch(`${apiUrl}/api/risk-assets`);

  // Comprobar si la respuesta HTTP es correcta.
  if (!response.ok) {
    throw new Error(
      `Error al consultar la API. Código HTTP: ${response.status}`
    );
  }

  // Convertir la respuesta JSON en objetos JavaScript.
  const data = await response.json();

  // Comprobar que hemos recibido una colección.
  if (!Array.isArray(data)) {
    throw new Error("La API no ha devuelto una lista válida.");
  }

  return data;
}
