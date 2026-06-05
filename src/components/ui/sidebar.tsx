/* Minimal sidebar hook used by theme toggle. */
import { useState } from 'react'

export function useSidebar() {
  const [state] = useState<'open' | 'closed'>('open')
  return { state }
}
