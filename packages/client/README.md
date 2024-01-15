# @tg-app/validate-service-client

Client for [tg-app-validate-service] for frontend and Node.js.

[tg-app-validate-service]:
  https://github.com/bigslycat/tg-app/tree/main/packages/client

## Install

```sh
npm i -S @tg-app/validate-service-client
# or
yarn add @tg-app/validate-service-client
```

## Usage

### Frontend

```ts
import { WebClient } from '@tg-app/validate-service-client'

const client = new WebClient('https://example.com/validate-service') // or relative or absolute path

client.parseInitData(initData).then(webAppInitData => {
  // do it
})
```

### Node.js

```ts
import { NodeClient } from '@tg-app/validate-service-client/node'

const client = new NodeClient('https://example.com/validate-service')

client.parseInitData(initData).then(webAppInitData => {
  // do it
})
```
