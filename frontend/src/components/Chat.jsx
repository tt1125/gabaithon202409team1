import { useRef, useEffect } from 'react'
import { FaRobot } from 'react-icons/fa'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import SearchBox from './SearchBox'
import { backgroundColor, backgroundSubColor, mediaQuery } from '@/app/globals'
import { useMediaQuery } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export default function Chat({
  messages,
  queryText,
  queryLoading,
  handleInputQueryText,
  handleClearQueryText,
  handleSendMessage,
  handleClickReset,
}) {

  const isMobileSize = useMediaQuery(mediaQuery.sp)

  const messagesEndRef = useRef(null)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <>
      <div
        style={{
          height: messages.length > 10 ? '100vh' : 'auto', // 条件に応じて高さを変更
          overflowY: 'auto',
          marginBottom: '0',
          // paddingTop: '64px',
          // paddingBottom: '200px',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              borderBottom: idx !== messages.length - 1 ? '1px solid #e1e2e6' : 'none',
              backgroundColor: msg.sender === 'user' ? backgroundColor : backgroundSubColor,
              padding: '16px 0',
            }}
          >
            <div
              style={{
                maxWidth: '800px',
                width: 'calc(100% - 32px)',
                margin: 'auto',
                display: 'flex',
              }}
            >
              {msg.sender === 'user' ? (
                <AccountCircle style={{ width: '24px', height: '24px', margin: '8px' }} />
              ) : (
                <FaRobot style={{ width: '24px', height: '24px', margin: '8px' }} />
              )}
              <div
                style={{ flex: 1, margin: '0', padding: '8px 16px' }}
                className="w-full whitespace-pre-wrap"
              >
                {msg.contents.map((content, index) => {
                  if (!content.url) {
                    if (!content.isHeader) {
                      if (!content.text)
                        return (
                          <div key={index} className="loading">
                            ....
                          </div>
                        )
                      else return content.text
                    } else {
                      return (
                        <div key={index} className="pt-4">
                          <div style={{ fontWeight: 'bold' }}>{content.text}</div>
                        </div>
                      )
                    }
                  }
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          position: 'fixed', // 追加
          bottom: '0', // 追加
          maxWidth: isMobileSize ? '' : '800px', // 修正
          width: isMobileSize ? '100%' : '', // 修正
          backgroundColor: 'white', // 背景色を追加して重なりを防ぐ
          padding: '16px', // パディングを追加して見た目を調整
        }}
      >
        <SearchBox
          label=""
          queryText={queryText}
          handleSearch={handleSendMessage}
          handleInputText={handleInputQueryText}
          handleClearText={handleClearQueryText}
        />
        <Button
          variant="contained"
          component="label"
          sx={{
            height: 'full',
            borderRadius: '12px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleClickReset}
          disabled={queryLoading || !messages.length}
        >

          <RestartAltIcon />

        </Button>
      </div>
    </>
  )
}
