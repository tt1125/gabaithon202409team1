import { mapPrefectures } from '@/datas/mapPrefectures';
import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardBody, Heading, Text, Stack, StackDivider, Box, Image } from '@chakra-ui/react';

// 初期化用の定数
const INITIALIZE_LAT = 35.68238;  // 緯度
const INITIALIZE_LNG = 139.76556; // 経度
const INITIALIZE_ZOOM = 15;        // ズームレベル

const INITIALIZE_MAP_WIDTH = '100%';  // 地図の幅
const INITIALIZE_MAP_HEIGHT = '100%'; // 地図の高さ

const GoogleMap = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState(null); // 緯度経度stateの追加
    const [shops, setShops] = useState([]); // 周辺店舗stateの追加
    const [startLocation, setStartLocation] = useState(null); // スタート地点state(追加)
    const [endLocation, setEndLocation] = useState(null); // ゴール地点state追加
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [ariaLabel, setAriaLabel] = useState('');

    const previewClicked = () => {
        const dialogElement = document.querySelector('[role="dialog"]');
        if (!dialogElement) return; // dialogElementがない時はreturn
        const shop = dialogElement.getAttribute('aria-label');
        setAriaLabel(shop || ''); // nullチェック
        setIsOpen(true);
    };

    useEffect(() => {
        if (!mapRef.current) return;

        // ユーザーの現在地を取得
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const initializedMap = new google.maps.Map(mapRef.current, {
                    center: { lat: latitude, lng: longitude },
                    zoom: INITIALIZE_ZOOM,
                });
                setMap(initializedMap);
            },
            (error) => {
                console.error("Error getting location: ", error);
                // 位置情報取得に失敗した場合はデフォルトの位置を使用
                const initializedMap = new google.maps.Map(mapRef.current, {
                    center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
                    zoom: INITIALIZE_ZOOM,
                });
                setMap(initializedMap);
            }
        );
    }, []);

    const renderDirections = (result) => {
        if (directionsRenderer) {
            directionsRenderer.setMap(null);
        }

        // Google Maps APIにおいて、道順をマップ上に描画するためのオブジェクトを取得する
        const renderer = new google.maps.DirectionsRenderer();
        // 現在のマップオブジェクトを追加する
        renderer.setMap(map);
        // ルートの結果を設定
        renderer.setDirections(result);
        setDirectionsRenderer(renderer);
    };

    useEffect(() => {
        if (!map) return;

        map.addListener('click', (event) => {
            // 緯度経度の取得
            const latitude = event.latLng.lat();
            const longitude = event.latLng.lng();
            setLocation({ lat: latitude, lng: longitude });

            // 店舗データの取得(追加)
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
        });

    }, [map]);

    useEffect(() => {
        if (!map) return

        // スタート地点、ゴール地点の地点間のルートを計算し、その結果を処理する(追加)
        if (startLocation && endLocation) {
            // 指定された開始地点と終了地点間のルートを計算する為のオブジェクトを取得する
            const directionsService = new google.maps.DirectionsService();

            // ルート計算のリクエスト
            directionsService.route({
                origin: mapPrefectures[startLocation],      // スタート地点
                destination: mapPrefectures[endLocation],   // ゴール地点
                travelMode: google.maps.TravelMode.DRIVING, // 移動手段(車)
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    renderDirections(result);
                } else {
                    console.error('Directions request failed due to ' + status);
                }
            });
        }

    }, [map, startLocation, endLocation]);

    useEffect(() => {
        if (!mapRef.current) return;

        const initializedMap = new google.maps.Map(mapRef.current, {
            center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
            zoom: INITIALIZE_ZOOM,
        });

        setMap(initializedMap);
    }, []);

    return (
        <div style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }}>
            <script
                async
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`}
            />
            <div style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }}>
                <Button
                    variant='contained'
                    style={{ position: 'absolute', top: '13px', left: '230px', zIndex: 1000 }}
                    onClick={() => previewClicked()}
                >
                    店舗を検索
                </Button>
                <div ref={mapRef} style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }} />
            </div>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    zIndex: 2000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ShopPreview setIsOpen={setIsOpen} name={ariaLabel} location={location} />
                </div>
            )}
        </div>
    );
}

export default GoogleMap;

const ShopPreview = ({ setIsOpen, name, location }) => {
    const [loading, setLoading] = useState(true);
    const [shopData, setShopData] = useState(null);

    // ダミーデータを定義
    const dummyData = {
        id: "aaa",
        name: 'Sample Restaurant',
        description: 'This is a sample description for the restaurant.',
        address: '123 Sample Street, Sample City',
        phone: '123-456-7890',
        hours: '9:00 AM - 9:00 PM',
        image: 'https://via.placeholder.com/600',
        genre: "中華",
        priceRange: "1000~2000円",
    };

    useEffect(() => {
        // サンプルで少し遅延させてダミーデータをセット
        setTimeout(() => {
            setShopData(dummyData);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Card
            sx={{ backgroundColor: loading ? "transparent" : "white" }}
            align="center"
            maxW={{ base: '90%', sm: '80%', md: '60%', lg: '50%' }}
            m="auto"
            p="4"
            width={{ base: '80%', md: '60%', lg: '40%' }}
            overflow="hidden"
            boxShadow="sm"
        >
            {loading ? (
                <CircularProgress
                    sx={{
                        color: "white",
                        backgroundColor: "transparent"
                    }}
                />
            ) : (
                <>
                    <Box
                        onClick={() => setIsOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: '5px',
                            right: '8px',
                            backgroundColor: "gray",
                            color: "white",
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            zIndex: 1000,
                        }}
                    >
                        ×
                    </Box>
                    <CardHeader position="relative">
                        <Heading size='md'>{shopData?.name}</Heading>
                    </CardHeader>
                    <Image
                        src={shopData?.image}
                        alt={shopData?.name}
                        borderRadius='md'
                        width="100%"
                        height="auto"
                        maxHeight="300px"
                        objectFit="cover"
                    />
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4' mt="4">
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    住所
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {shopData?.address}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    電話番号
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {shopData?.phone}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    営業時間
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {shopData?.hours}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    ジャンル
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {shopData?.genre}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    価格帯
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {shopData?.priceRange}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </>
            )}
        </Card>
    );
};
