import { FC } from 'react'

import '@tg-app/types/global'

import { AppProvider } from '@tg-app/react'

import { BackButtonDemo } from 'widgets/back-button-demo'
import { InitDataValidateDemo } from 'widgets/init-data-validate-demo'
import { MainButtonDemo } from 'widgets/main-button-demo'
import { SettingsButtonDemo } from 'widgets/settings-button-demo'

import styles from './App.module.css'

export const Root: FC = () => {
  if (!import.meta.env.VITE_VALIDATION_SERVICE_URL) return null

  return (
    <AppProvider
      validationServiceUrl={import.meta.env.VITE_VALIDATION_SERVICE_URL}
    >
      <div className={styles.main}>
        <InitDataValidateDemo />
        <BackButtonDemo />
        <SettingsButtonDemo />
        <MainButtonDemo />
      </div>
    </AppProvider>
  )
}
