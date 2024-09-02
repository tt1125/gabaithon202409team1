"use client"

import { useState } from 'react'; // ここを追加
import Chat from "@/components/Chat";
import Map from "@/components/Map";
import { useMediaQuery } from "@mui/material";
import { mediaQuery } from './globals';

export default function Home() {

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
      const fileDataList = await vectorUseCase.queryFileVector(
        queryText,
        namespace,
        sendMessages,
        callBackResultText,
      )
      handleAddMessageContents({ text: '参考資料', isHeader: true })
      fileDataList.forEach((data) => {
        const text = data.fileName
        handleAddMessageContents({ text, url: data.url, pageNumber: data.pageNumber })
      })
    } catch (error) {
      console.error(error)
      alert('エラーが発生しました。\n時間をおいて再度お試しください。')
    }
    handleQueryLoading(false)
  }

  const handleClickStopGenerate = () => {
    setMessages((prevOutput) => {
      const newOutput = cloneDeep(prevOutput)
      newOutput.splice(-2, 2)
      return newOutput
    })
  }

  const handleClickReset = () => {
    setMessages([])
  }

  return (
    !isMobileSize ?
      <main style={{ height: '100%', width: '100%', display: 'flex' }}>
        <div style={{ width: '70%' }}><Map defaultPosition={{ lat: 35.681236, lng: 139.767125 }} /></div>
        <div style={{ width: '30%' }}><Chat
          messages={messages}
          queryText={queryText}
          queryLoading={queryLoading}
          handleInputQueryText={handleInputQueryText}
          handleClearQueryText={handleClearQueryText}
          handleSendMessage={handleSendMessage}
          handleClickReset={handleClickReset}
          handleClickStopGenerate={handleClickStopGenerate}
        /></div>
      </main>
      :
      <main style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', height: '55%' }}>
          <Map defaultPosition={{ lat: 35.681236, lng: 139.767125 }} /></div>
        <div style={{ width: '100%', height: '45%' }}>
          <Chat
            messages={messages}
            queryText={queryText}
            queryLoading={queryLoading}
            handleInputQueryText={handleInputQueryText}
            handleClearQueryText={handleClearQueryText}
            handleSendMessage={handleSendMessage}
            handleClickReset={handleClickReset}
            handleClickStopGenerate={handleClickStopGenerate}
          /></div>
      </main>
  );
}