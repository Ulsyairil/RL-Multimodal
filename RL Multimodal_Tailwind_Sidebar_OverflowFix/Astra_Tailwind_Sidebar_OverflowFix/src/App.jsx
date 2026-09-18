import { useMemo } from 'react'
import { Sidebar, BuggySidebar } from './AfterSidebar'

export default function App() {
  const isBefore = useMemo(
    () => new URLSearchParams(window.location.search).get('view') === 'before',
    [],
  )
  return isBefore ? <BuggySidebar /> : <Sidebar />
}