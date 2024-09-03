// src/components/GoogleMap.tsx
import React, { useEffect, useRef, useState } from 'react';

// 初期化用の定数
const INITIALIZE_LAT = 35.68238;  // 緯度
const INITIALIZE_LNG = 139.76556; // 経度
const INITIALIZE_ZOOM = 15;        // ズームレベル

const INITIALIZE_MAP_WIDTH = '100%';  // 地図の幅
const INITIALIZE_MAP_HEIGHT = '400px'; // 地図の高さ

const GoogleMap = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState(null); // 緯度経度stateの追加
    const [shops, setShops] = useState([]);// 周辺店舗stateの追加


    useEffect(() => {
        if (!map) return;

        // クリックリスナー追加
        map.addListener('click', (event) => {
            // 緯度経度の取得
            const latitude = event.latLng.lat();
            const longitude = event.latLng.lng();
            setLocation({ lat: latitude, lng: longitude });
        });
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: { lat: latitude, lng: longitude },
            radius: 1000,  // 検索範囲（メートル）
            type: 'store'  // 店舗を検索
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setShops(results);
            }
        });

    }, [map]);

    useEffect(() => {
        if (!mapRef.current) return;

        const initializedMap = new google.maps.Map(mapRef.current, {
            center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
            zoom: INITIALIZE_ZOOM,
        });

        setMap(initializedMap);
    }, []);

    return (
        <div>
            <script
                async
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`}
            />
            <div ref={mapRef} style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }} />
        </div>
    )
}

export default GoogleMap;