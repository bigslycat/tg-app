import { FC, ReactNode, createContext, memo, useMemo } from 'react'

import { WebClient } from '@tg-app/validate-service-client'

export const AppContext = createContext<AppContext>(null!)

export interface AppContext {
  readonly client: WebClient
}

export namespace AppProvider {
  export interface Props {
    validationServiceUrl: string
    children?: ReactNode
  }
}

export const AppProvider: FC<AppProvider.Props> = ({
  validationServiceUrl,
  children,
}) => {
  const client = useMemo(
    () => new WebClient(validationServiceUrl),
    [validationServiceUrl],
  )

  const context = useMemo<AppContext>(
    () => ({
      client,
    }),
    [client],
  )

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
