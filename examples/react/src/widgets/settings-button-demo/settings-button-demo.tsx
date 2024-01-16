import { memo, useState } from 'react'

import { SettingsButton } from '@tg-app/react'
import { Card, Checkbox } from 'shared/ui'

export const SettingsButtonDemo = memo(() => {
  const [showSettingsButton, setShowSettingsButton] = useState(false)

  return (
    <>
      <SettingsButton hide={!showSettingsButton} />

      <Card title='Settings button'>
        <Checkbox
          label='Show'
          checked={showSettingsButton}
          onChange={setShowSettingsButton}
        />
      </Card>
    </>
  )
})
