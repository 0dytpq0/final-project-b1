"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapAPI = process.env.MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 14.018,
  lng: 120.835941,
};

function TestMapPage() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBWFF2ahRd3PsebRLbum80bXE6Hh3-1d4A">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default TestMapPage;
