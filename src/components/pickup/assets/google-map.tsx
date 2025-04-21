'use client'

import {
  useLoadScript,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "210px",
};

interface Location {
  lat: number;
  lng: number;
  label?: string;
}

interface MapComponentProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function MapComponent({
  locations,
  center = { lat: 24.7136, lng: 46.6753 }, // Default to Riyadh, Saudi Arabia
  zoom = 10,
}: MapComponentProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  // Calculate center from locations if not provided
  const [mapCenter, setMapCenter] = useState(center);

  // Update center if locations change and no center is explicitly provided
  useEffect(() => {
    // If there's only one location and no specific center was provided,
    // center the map on that location
    if (locations.length === 1 && !center) {
      setMapCenter({ lat: locations[0].lat, lng: locations[0].lng });
    } 
    // If there are multiple locations and no specific center, calculate the average
    else if (locations.length > 1 && !center) {
      const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [locations, center]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={mapCenter}
    >
      {locations.map((location, index) => (
        <Marker
          key={`${location.lat}-${location.lng}-${index}`}
          position={{ lat: location.lat, lng: location.lng }}
          label={location.label}
        />
      ))}
    </GoogleMap>
  );
}