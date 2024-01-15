import type { Telegram } from '@tg-app/types'

export interface Client {
  parseInitData(initData: string): Promise<Telegram.WebAppInitData>
}
