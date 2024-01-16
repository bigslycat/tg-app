import { FC, useEffect } from 'react'

import { Telegram } from '@tg-app/types'

import { getWebbApp } from './get-web-app'

import EventType = Telegram.EventType

export namespace BackButton {
  export interface Props {
    hide?: boolean
    onClick?(): void
  }
}

export const BackButton: FC<BackButton.Props> = ({ hide, onClick }) => {
  useEffect(
    () => () => {
      getWebbApp()?.BackButton.hide()
    },
    [],
  )

  useEffect(() => {
    const WebApp = getWebbApp()
    if (!onClick || !WebApp) return

    WebApp.onEvent(EventType.BackButtonClicked, onClick)

    return () => {
      WebApp.offEvent(EventType.BackButtonClicked, onClick)
    }
  }, [onClick])

  useEffect(() => {
    const WebApp = getWebbApp()
    if (!WebApp) return

    if (hide) WebApp.BackButton.hide()
    else WebApp.BackButton.show()
  }, [hide])

  return null
}
