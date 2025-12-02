import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// FIX ICONOS
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// UBICACIÓN FIJA CEMCAA
const CEMCAA = [21.29858, -100.51114];

function MapaGeolocalizacion() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => alert("No se pudo obtener tu ubicación")
    );
  }, []);

  const abrirRuta = () => {
    if (!userLocation) return;

    const destino = `${CEMCAA[0]},${CEMCAA[1]}`;
    const origen = `${userLocation[0]},${userLocation[1]}`;
    const url = `https://www.google.com/maps/dir/${origen}/${destino}`;

    window.open(url, "_blank");
  };

  return (
    <>
      <MapContainer
        center={CEMCAA}
        zoom={14}
        style={{ height: "400px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marcador CEMCAA */}
        <Marker position={CEMCAA}>
          <Popup>📍 CEMCAA</Popup>
        </Marker>

        {/* Marcador usuario */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>📍 Tu ubicación</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="text-center mt-3">
        {userLocation && (
          <button
            onClick={abrirRuta}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            🧭 Cómo llegar a CEMCAA
          </button>
        )}
      </div>
    </>
  );
}

export default MapaGeolocalizacion;
