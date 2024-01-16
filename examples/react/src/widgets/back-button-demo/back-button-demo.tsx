import { memo, useState } from 'react'

import { BackButton } from '@tg-app/react'

import { Card, Checkbox } from 'shared/ui'

export const BackButtonDemo = memo(() => {
  const [showBackButton, setShowBackButton] = useState(false)

  return (
    <>
      <BackButton hide={!showBackButton} />

      <Card title='Back button'>
        <Checkbox
          label='Show'
          checked={showBackButton}
          onChange={setShowBackButton}
        />
      </Card>
    </>
  )
})
