import type { Telegram } from './telegram'

declare global {
  interface Window {
    readonly Telegram?: Telegram
  }
}
