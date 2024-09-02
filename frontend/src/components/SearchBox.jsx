import { useEffect, useRef, useState } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'


export default function CustomizedInputBase(props) {
    const textareaRef = useRef(null)
    const hiddenDivRef = useRef(null)
    const [height, setHeight] = useState('24px')

    const [composing, setComposition] = useState(false)

    const startComposition = () => setComposition(true)
    const endComposition = () => setComposition(false)

    useEffect(() => {
        adjustTextareaHeight()
    }, [props.queryText])

    const adjustTextareaHeight = () => {
        if (hiddenDivRef.current) {
            setHeight(`${hiddenDivRef.current.scrollHeight || 24}px`)
        }
    }

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '12px',
                width: '100%',
                boxShadow: '0 0 15px rgba(0,0,0,.1)',
                border: '1px solid #e1e2e6',
            }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={props.handleSearch}>
                <SearchIcon />
            </IconButton>
            <div
                style={{
                    padding: '8px 0',
                    flex: 1,
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                }}
            >
                <textarea
                    ref={textareaRef}
                    style={{
                        border: 'none',
                        outline: 'none',
                        maxHeight: '200px',
                        height: height,
                        // overflowY: 'hidden',
                    }}
                    className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
                    value={props.queryText}
                    placeholder={props.label}
                    onChange={(e) => {
                        props.handleInputText(e)
                        adjustTextareaHeight()
                    }}
                    onCompositionStart={startComposition}
                    onCompositionEnd={endComposition}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !composing) {
                            e.preventDefault()
                            props.handleSearch()
                        }
                    }}
                />
                <div
                    ref={hiddenDivRef}
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        visibility: 'hidden',
                        // position: 'absolute',
                        // top: 0,
                        // left: 0,
                        width: '100%',
                    }}
                    className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
                >
                    {props.queryText + ' '}
                </div>
            </div>
            <IconButton sx={{ p: '10px' }} aria-label="clear" onClick={props.handleClearText}>
                <ClearIcon />
            </IconButton>
        </Paper>
    )
}
