'use client';

export const handlePositionUpdate = (position) => {
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

