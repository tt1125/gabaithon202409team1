import { useState, useRef, useEffect } from 'react'
import { FaRobot } from 'react-icons/fa'
import { backgroundColor, backgroundSubColor } from '@/styles/globals'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { mainColor } from '@/styles/globals'
import SearchBox from './SearchBox'

export default function ChatScreen({
  messages,
  queryText,
  queryLoading,
  handleInputQueryText,
  handleClearQueryText,
  handleSendMessage,
  handleClickReset,
  handleClickStopGenerate,
}) {
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
          height: '100vh',
          overflowY: 'auto',
          marginBottom: '0',
          paddingTop: '64px',
          paddingBottom: '200px',
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
                  } else {
                    return (
                      <div key={index}>
                        <span>「</span>
                        {/* <Link
                          rel="noopener"
                          target="_blank"
                          color="inherit"
                          href={content.url + '#page=' + content.pageNumber}
                        >
                          <span className="font-bold">{content.text}</span>
                        </Link> */}
                        <span
                          className="font-bold"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setPdf(content.url + '#page=' + content.pageNumber)}
                        >
                          {content.text}
                        </span>
                        <span>」の</span>
                        <span className="font-bold">{content.pageNumber}</span>
                        <span>ページ目</span>
                      </div>
                    )
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
          flexDirection: 'column',
          gap: '8px',
          position: 'fixed', // 追加
          bottom: '0', // 追加
          maxWidth: '800px',
          width: '100%',
          backgroundColor: 'white', // 背景色を追加して重なりを防ぐ
          padding: '16px', // パディングを追加して見た目を調整
        }}
      >
        {/* <div className="w-full flex justify-end">
          {queryLoading && (
            <Button
              variant="outlined"
              component="label"
              color="error"
              sx={{
                height: '30px',
                width: '200px',
                borderRadius: '12px',
              }}
              onClick={handleClickStopGenerate}
            >
              生成を中止する
            </Button>
          )}
        </div> */}
        <SearchBox
          label="検索文章を入力してください"
          queryText={queryText}
          handleSearch={handleSendMessage}
          handleInputText={handleInputQueryText}
          handleClearText={handleClearQueryText}
        />
        <Button
          variant="contained"
          component="label"
          color="info"
          sx={{
            height: '40px',
            borderRadius: '12px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleClickReset}
          disabled={queryLoading || !messages.length}
        >
          新しいページにリセット
        </Button>
      </div>
    </>
  )
}
