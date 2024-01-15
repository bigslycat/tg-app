import { request as httpRequest } from 'node:http'
import { request as httpsRequest } from 'node:https'

import { Telegram } from '@tg-app/types'

import type { Client } from './client'
import { HttpError } from './http-error'

export { Client, HttpError }

export class NodeClient implements Client {
  private readonly request: typeof httpRequest
  private readonly requestUrl: string

  constructor(readonly baseUrl: string) {
    this.request = baseUrl.startsWith('https://') ? httpsRequest : httpRequest
    this.requestUrl = `${baseUrl}/parse`
  }

  parseInitData(initData: string): Promise<Telegram.WebAppInitData> {
    return new Promise<Telegram.WebAppInitData>((resolve, reject) => {
      const request = this.request(`${this.requestUrl}?${initData}`)

      request.on('response', response => {
        if (response.statusCode! < 400) {
          response.setEncoding('utf8')

          response
            .reduce<string>((acc, data) => `${acc}${data}`, '')
            .then(JSON.parse)
            .then(resolve)
            .catch(reject)
        } else {
          reject(new HttpError(response.statusCode!, response.statusMessage))
        }
      })

      request.on('error', e => {
        console.error(`problem with request: ${e.message}`)
      })
    })
  }
}
