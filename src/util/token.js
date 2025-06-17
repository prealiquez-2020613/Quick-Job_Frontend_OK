// util/token.js
export const getCurrentUid = () => {
  const raw = localStorage.getItem('token')
  if (!raw) return null
  try {
    const payload = JSON.parse(atob(raw.split('.')[1]))
    return payload.uid || payload.id || null
  } catch {
    return null
  }
}
