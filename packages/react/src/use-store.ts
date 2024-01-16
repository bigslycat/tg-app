import { useEffect, useState } from 'react'
import { Store } from './store'

export function useStore<T>(store: Store<T>) {
  const [state, setState] = useState(() => store.getState())

  useEffect(() => store.watch(setState), [store])

  return state
}
