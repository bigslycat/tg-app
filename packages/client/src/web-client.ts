import { Telegram } from '@tg-app/types'

import type { Client } from './client'
import { HttpError } from './http-error'

export { Client, HttpError }

export class WebClient implements Client {
  private readonly requestUrl: string

  constructor(readonly baseUrl = '') {
    this.requestUrl = `${baseUrl}/parse`
  }

  async parseInitData(initData: string): Promise<Telegram.WebAppInitData> {
    const response = await fetch(`${this.requestUrl}?${initData}`)

    if (response.status! < 400) {
      return response.json()
    } else {
      throw new HttpError(response.status!, response.statusText)
    }
  }
}
