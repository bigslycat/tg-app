# @tg-app/types

[Telegram Mini App] type definitions.

## Install

```sh
npm i -S @tg-app/types
# or
yarn add @tg-app/types
```

## Usage

### Direct import

```ts
import { Telegram } from '@tg-app/types'

function closeApp(app: Telegram.WebApp) {
  app.close()
}
```

### Define globals

```ts
import '@tg-app/types/global'

function closeApp() {
  window.Telegram?.WebApp.close()
}
```

[Telegram Mini App]:
  https://core.telegram.org/bots/webapps#initializing-mini-apps
