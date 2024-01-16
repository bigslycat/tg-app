import { FC, useEffect } from 'react'

import { Telegram } from '@tg-app/types'

import { getWebbApp } from './get-web-app'

import EventType = Telegram.EventType

export namespace MainButton {
  export interface Props {
    children: string
    color?: string
    textColor?: string
    disabled?: boolean
    pending?: boolean
    hide?: boolean
    onClick?(): void
  }
}

export const MainButton: FC<MainButton.Props> = ({
  children,
  color,
  textColor,
  disabled,
  pending,
  hide,
  onClick,
}) => {
  useEffect(
    () => () => {
      getWebbApp()?.MainButton.hide()
    },
    [],
  )

  useEffect(() => {
    const WebApp = getWebbApp()
    if (!WebApp) return

    if (pending) {
      WebApp.MainButton.showProgress(false)
    } else {
      WebApp.MainButton.hideProgress()
    }

    WebApp.MainButton.setParams({
      text: children || 'CONTINUE',
      color: color || window.Telegram?.WebApp.themeParams.button_color,
      text_color:
        textColor || window.Telegram?.WebApp.themeParams.button_text_color,
      is_active: !disabled,
      is_visible: !hide,
    })
  }, [children, color, disabled, hide, pending, textColor])

  useEffect(() => {
    const WebApp = getWebbApp()
    if (!onClick || !WebApp) return

    WebApp.onEvent(EventType.MainButtonClicked, onClick)

    return () => {
      WebApp.offEvent(EventType.MainButtonClicked, onClick)
    }
  }, [onClick])

  return null
}
