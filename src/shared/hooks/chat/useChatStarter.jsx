// src/shared/hooks/chat/useChatStarter.jsx
import { useEffect, useRef, useCallback } from 'react'
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

export default function useChatStarter (onReady) {
  const socketRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || ''
    socketRef.current = io('http://localhost:5400', {
      auth: { token },
      autoConnect: true
    })
    return () => socketRef.current?.disconnect()
  }, [])

  const startChat = useCallback((participantId) => {
    const socket = socketRef.current
    if (!participantId || !socket) return

    const send = () => socket.emit('chat startup', { participantId })
    socket.once('chat ready', ({ chatId }) => onReady?.(chatId))

    socket.connected ? send() : socket.once('connect', send)
  }, [onReady])

  return startChat
}
