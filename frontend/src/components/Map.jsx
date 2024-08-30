"use client";

import { loadGoogleMapsAPI } from "@/lib/loadGoogleMapsAPI";
import { useEffect, useState } from "react";

const Index = () => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [marker, setMarker] = useState(null); // 新しい状態を追加

  useEffect(() => {
    loadGoogleMapsAPI(setMap);

    const handlePositionUpdate = (position) => {
      const { latitude, longitude } = position.coords;
      const newPosition = { lat: latitude, lng: longitude };
      setCurrentPosition(newPosition);

      if (map) {
        map.setCenter(newPosition);

        if (marker) {
          marker.setPosition(newPosition);
        } else {
          const newMarker = new google.maps.Marker({
            position: newPosition,
            map: map,
            title: "Current Position",
          });
          setMarker(newMarker);
        }
      }
    };

    const watchId = navigator.geolocation.watchPosition(handlePositionUpdate);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map, marker]); // markerを依存関係に追加

  return (
      <div id="map" style={{ height: "100%", width: "100%", margin: 0 }}></div>
  );
};

export default Index;