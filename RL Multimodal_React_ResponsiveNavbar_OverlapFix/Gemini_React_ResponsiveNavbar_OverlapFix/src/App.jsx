import { useMemo } from 'react'
import BeforeNavbar from './BeforeNavbar'
import AfterNavbar from './AfterNavbar'

export default function App() {
  const isBefore = useMemo(
    () => new URLSearchParams(window.location.search).get('view') === 'before',
    []
  )
  return isBefore ? <BeforeNavbar /> : <AfterNavbar />
}