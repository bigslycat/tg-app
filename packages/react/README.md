# @tg-app/react

React components for Telegram Mini Apps.

## Install

```sh
npm i -S @tg-app/react
# or
yarn add @tg-app/react
```

## Usage

```tsx
import { BackButton, MainButton, SettingsButton } from '@tg-app/react'

function App() {
  const [showBackButton, setShowBackButton] = useState(false)
  const [showMainButton, setShowMainButton] = useState(false)
  const [disableMainButton, setDisableMainButton] = useState(false)
  const [pendingMainButton, setPendingMainButton] = useState(false)
  const [mainButtonText, setMainButtonText] = useState('')

  const [mainButtonColor, setMainButtonColor] = useState(
    () => window.Telegram?.WebApp.themeParams.button_color,
  )

  const [mainButtonTextColor, setMainButtonTextColor] = useState(
    () => window.Telegram?.WebApp.themeParams.button_text_color,
  )

  const [showSettingsButton, setShowSettingsButton] = useState(false)

  return (
    <>
      <BackButton hide={!showBackButton} />

      <MainButton
        hide={!showMainButton}
        color={mainButtonColor}
        textColor={mainButtonTextColor}
        disabled={disableMainButton}
        pending={pendingMainButton}
      >
        {mainButtonText}
      </MainButton>

      <SettingsButton hide={!showSettingsButton} />
    </>
  )
}
```
