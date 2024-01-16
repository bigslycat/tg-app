import { useEffect, useMemo, useState } from 'react'

import { Telegram } from '@tg-app/types'

import { getWebbApp } from './get-web-app'

export function useTheme() {
  const [colorScheme, setColorScheme] = useState(
    () => window.Telegram?.WebApp.colorScheme ?? Telegram.ColorScheme.Light,
  )

  const [themeParams, setThemeParams] = useState<Telegram.ThemeParams>(() => ({
    ...window.Telegram?.WebApp.themeParams,
  }))

  useEffect(() => {
    const WebbApp = getWebbApp()

    if (!WebbApp) return

    function handler(this: Telegram.ThemeChangedHandlerContext) {
      setColorScheme(this.colorScheme)

      setThemeParams(themeParams => {
        const changed = !(
          themeParams.accent_text_color ===
            this.themeParams.accent_text_color &&
          themeParams.bg_color === this.themeParams.bg_color &&
          themeParams.button_color === this.themeParams.button_color &&
          themeParams.button_text_color ===
            this.themeParams.button_text_color &&
          themeParams.destructive_text_color ===
            this.themeParams.destructive_text_color &&
          themeParams.header_bg_color === this.themeParams.header_bg_color &&
          themeParams.hint_color === this.themeParams.hint_color &&
          themeParams.link_color === this.themeParams.link_color &&
          themeParams.secondary_bg_color ===
            this.themeParams.secondary_bg_color &&
          themeParams.section_bg_color === this.themeParams.section_bg_color &&
          themeParams.section_header_text_color ===
            this.themeParams.section_header_text_color &&
          themeParams.subtitle_text_color ===
            this.themeParams.subtitle_text_color
        )

        return changed
          ? {
              ...themeParams,
              ...this.themeParams,
            }
          : themeParams
      })
    }

    WebbApp.onEvent(Telegram.EventType.ThemeChanged, handler)
  }, [])

  return useMemo(
    () =>
      ({
        colorScheme,
        themeParams,
      }) as const,
    [colorScheme, themeParams],
  )
}
