import { FC, useState } from 'react'

import '@tg-app/types/global'

import { BackButton, MainButton, SettingsButton } from '@tg-app/react'

import styles from './App.module.css'

export const Root: FC = () => {
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

      <div className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.cardHeader}>Back button</h2>
          <label className={styles.checkbox}>
            <input
              type='checkbox'
              checked={showBackButton}
              onChange={e => setShowBackButton(e.target.checked)}
            />
            Show
          </label>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardHeader}>Main button</h2>

          <label className={styles.input}>
            <span>Text</span>
            <input
              type='text'
              value={mainButtonText}
              onChange={e => setMainButtonText(e.target.value)}
            />
          </label>

          <label className={styles.input}>
            <span>Color</span>
            <input
              type='color'
              value={mainButtonColor}
              onChange={e => setMainButtonColor(e.target.value)}
            />
          </label>

          <label className={styles.input}>
            <span>Text color</span>
            <input
              type='color'
              value={mainButtonTextColor}
              onChange={e => setMainButtonTextColor(e.target.value)}
            />
          </label>

          <label className={styles.checkbox}>
            <input
              type='checkbox'
              checked={showMainButton}
              onChange={e => setShowMainButton(e.target.checked)}
            />
            Show
          </label>

          <label className={styles.checkbox}>
            <input
              type='checkbox'
              checked={disableMainButton}
              onChange={e => setDisableMainButton(e.target.checked)}
            />
            Disable
          </label>

          <label className={styles.checkbox}>
            <input
              type='checkbox'
              checked={pendingMainButton}
              onChange={e => setPendingMainButton(e.target.checked)}
            />
            Pending
          </label>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardHeader}>Settings button</h2>
          <label className={styles.checkbox}>
            <input
              type='checkbox'
              checked={showSettingsButton}
              onChange={e => setShowSettingsButton(e.target.checked)}
            />
            Show
          </label>
        </div>
      </div>
    </>
  )
}
