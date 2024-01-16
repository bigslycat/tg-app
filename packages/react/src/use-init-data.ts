import { useContext, useEffect, useMemo } from 'react'

import { Telegram } from '@tg-app/types'
import { HttpError } from '@tg-app/validate-service-client'

import { AppContext } from './app-provider'
import { Store } from './store'
import { useStore } from './use-store'

const store = new Store<State>({
  initData: null,
  pending: false,
  error: null,
})

interface State {
  readonly initData: Telegram.WebAppInitData | null
  readonly pending: boolean
  readonly error: Error | HttpError | null
}

export { HttpError }

export function useInitData() {
  const { client } = useContext(AppContext)

  const { initData, pending, error } = useStore(store)

  useEffect(() => {
    const initDataString = window.Telegram?.WebApp.initData

    if (initData || pending || error || !initDataString) return

    store.setState({
      initData: null,
      pending: true,
      error: null,
    })

    client
      .parseInitData(initDataString)
      .then(initData =>
        store.setState({
          initData,
          pending: false,
          error: null,
        }),
      )
      .catch(error =>
        store.setState({
          initData: null,
          pending: false,
          error,
        }),
      )
  }, [client, error, initData, pending])

  return useMemo(
    () =>
      ({
        initData,
        pending,
        error,
      }) as const,
    [error, initData, pending],
  )
}
