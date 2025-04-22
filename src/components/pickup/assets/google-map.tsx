'use client'

import {
  useLoadScript,
  GoogleMap,
} from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "210px",
};

interface Location {
  _latitude: number;
  _longitude: number;
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
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<any[]>([]);

  // Update center if locations change and no center is explicitly provided
  useEffect(() => {
    // If there's only one location and no specific center was provided,
    // center the map on that location
    if (locations.length === 1 && !center) {
      setMapCenter({ lat: locations[0]._latitude, lng: locations[0]._longitude });
    } 
    // If there are multiple locations and no specific center, calculate the average
    else if (locations.length > 1 && !center) {
      const avgLat = locations.reduce((sum, loc) => sum + loc._latitude, 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + loc._longitude, 0) / locations.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [locations, center]);

  // Effect to create markers when map is loaded and locations change
  useEffect(() => {
    if (!isLoaded || !map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // Create new markers
    const newMarkers = locations.map((location, index) => {
      // Using the traditional Marker but configured properly
      const marker = new window.google.maps.Marker({
        position: { lat: location._latitude, lng: location._longitude },
        map: map,
        label: location.label,
      });
      
      return marker;
    });

    markersRef.current = newMarkers;

    // If we have markers, make sure the map can see them
    if (newMarkers.length > 0) {
      if (newMarkers.length === 1) {
        // Center on the single marker
        map.setCenter({ lat: locations[0]._latitude, lng: locations[0]._longitude });
      } else {
        // Fit bounds to show all markers
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(location => {
          bounds.extend({ lat: location._latitude, lng: location._longitude });
        });
        map.fitBounds(bounds);
      }
    }

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach(marker => {
        marker.setMap(null);
      });
    };
  }, [isLoaded, map, locations]);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={mapCenter}
      onLoad={onLoad}
    >
    </GoogleMap>
  );
}