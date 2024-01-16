import { memo } from 'react'

import { useInitData } from '@tg-app/react'

import { Card } from 'shared/ui'

export const InitDataValidateDemo = memo(() => {
  const { initData, pending, error } = useInitData()

  return (
    <Card title={`Validated init data${pending ? '...' : ''}`}>
      {initData && <pre>{JSON.stringify(initData, null, '  ')}</pre>}
      {error && (
        <div>
          <div>
            {error.name}: {error.message}
          </div>
          {'code' in error && <div>code: {error.code}</div>}
        </div>
      )}
    </Card>
  )
})
