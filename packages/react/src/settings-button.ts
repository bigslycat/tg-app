import { FC, useEffect } from 'react'

import { Telegram } from '@tg-app/types'

import { getWebbApp } from './get-web-app'

import EventType = Telegram.EventType

export namespace SettingsButton {
  export interface Props {
    hide?: boolean
    onClick?(): void
  }
}

export const SettingsButton: FC<SettingsButton.Props> = ({ hide, onClick }) => {
  useEffect(
    () => () => {
      getWebbApp()?.SettingsButton.hide()
    },
    [],
  )

  useEffect(() => {
    const WebApp = getWebbApp()
    if (!onClick || !WebApp) return

    WebApp.onEvent(EventType.SettingsButtonClicked, onClick)

    return () => {
      WebApp.offEvent(EventType.SettingsButtonClicked, onClick)
    }
  }, [onClick])

  useEffect(() => {
    const WebApp = getWebbApp()
    if (!WebApp) return

    if (hide) WebApp.SettingsButton.hide()
    else WebApp.SettingsButton.show()
  }, [hide])

  return null
}
