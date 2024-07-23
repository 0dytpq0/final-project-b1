"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 14.018,
  lng: 120.835941,
};

function TestMapPage() {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  if (!apiKey) {
    return <div>API Key가 설정되지 않았습니다.</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default TestMapPage;
