"use client"

import { useEffect, useState } from 'react'; // ここを追加
import Chat from "@/components/Chat";
import Map from "@/components/Map";
import { useMediaQuery } from "@mui/material";
import { mediaQuery } from './globals';
import cloneDeep from 'lodash/cloneDeep'
import GptUseCase from '@/useCase/gptUseCase';
import { loadGoogleMapsAPI } from "@/lib/loadGoogleMapsAPI";
import { APIProvider } from "@vis.gl/react-google-maps";


export default function Home() {

  const gptUseCase = new GptUseCase()

  // Chat
  const [messages, setMessages] = useState([])
  const [queryText, setQueryText] = useState('')
  const [queryLoading, setQueryLoading] = useState(false)

  const isMobileSize = useMediaQuery(mediaQuery.sp);

  const handleInputQueryText = (e) => {
    setQueryText(e.target.value)
  }
  const handleClearQueryText = () => {
    setQueryText('')
  }
  const handleQueryLoading = (value) => {
    setQueryLoading(value)
  }


  const handleSendMessage = async () => {
    if (!queryText) return
    if (queryLoading) return
    handleQueryLoading(true)
    const sendMessages = [
      ...cloneDeep(messages),
      { sender: 'user', contents: [{ text: queryText }] },
      { sender: 'assistant', contents: [{ text: '' }] },
    ]
    setQueryText('')
    setMessages(sendMessages)
    try {
      const fileDataList = await gptUseCase.sendMessage(
        queryText,
        sendMessages,
        currentPosition
      )
      handleAddMessageContents({ text: '参考資料', isHeader: true })
      fileDataList.forEach((data) => {
        const text = data.fileName
        // handleAddMessageContents({ text, url: data.url, pageNumber: data.pageNumber })
      })
    } catch (error) {
      console.error(error)
      alert('エラーが発生しました。\n時間をおいて再度お試しください。')
    }
    handleQueryLoading(false)
  }


  const handleClickReset = () => {
    setMessages([])
  }

  // Map
  const [targetPosition, setTargetPosition] = useState({ lat: 35.681236, lng: 139.767125 });

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // 新しい状態を追加
  const [currentPosition, setCurrentPosition] = useState(null);

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
    !isMobileSize ?
      <main style={{ height: '100%', width: '100%', display: 'flex' }}>
        <div style={{ width: '70%' }}>
          <Map targetPosition={targetPosition} setTargetPosition={setTargetPosition} />
        </div>
        <div style={{ width: '30%' }}>
          <Chat
            messages={messages}
            queryText={queryText}
            queryLoading={queryLoading}
            handleInputQueryText={handleInputQueryText}
            handleClearQueryText={handleClearQueryText}
            handleSendMessage={handleSendMessage}
            handleClickReset={handleClickReset}
          />
        </div>
      </main>
      :
      <main style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Set the height of the Map and Chat components using percentages */}
        <div style={{ height: '55%', width: '100%' }}>
          <Map targetPosition={targetPosition} setTargetPosition={setTargetPosition} />
        </div>
        <div style={{ height: '45%', width: '100%', overflowY: 'auto' }}>
          <Chat
            messages={messages}
            queryText={queryText}
            queryLoading={queryLoading}
            handleInputQueryText={handleInputQueryText}
            handleClearQueryText={handleClearQueryText}
            handleSendMessage={handleSendMessage}
            handleClickReset={handleClickReset}
          />
        </div>
      </main>
  );
}


