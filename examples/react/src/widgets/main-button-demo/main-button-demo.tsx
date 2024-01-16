import { memo, useState } from 'react'

import { MainButton } from '@tg-app/react'
import { Card, Checkbox, Input } from 'shared/ui'

export const MainButtonDemo = memo(() => {
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

  return (
    <>
      <MainButton
        hide={!showMainButton}
        color={mainButtonColor}
        textColor={mainButtonTextColor}
        disabled={disableMainButton}
        pending={pendingMainButton}
      >
        {mainButtonText}
      </MainButton>

      <Card title='Main button'>
        <Input
          label='Text'
          value={mainButtonText}
          onChange={setMainButtonText}
        />

        <Input
          label='Color'
          type='color'
          value={mainButtonColor}
          onChange={setMainButtonColor}
        />

        <Input
          label='Text color'
          type='color'
          value={mainButtonTextColor}
          onChange={setMainButtonTextColor}
        />

        <Checkbox
          label='Show'
          checked={showMainButton}
          onChange={setShowMainButton}
        />

        <Checkbox
          label='Disable'
          checked={disableMainButton}
          onChange={setDisableMainButton}
        />

        <Checkbox
          label='Pending'
          checked={pendingMainButton}
          onChange={setPendingMainButton}
        />
      </Card>
    </>
  )
})
