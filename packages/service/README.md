# tg-app-validate-service

[![Publish Docker image][Docker image workflow badge]][Docker image workflow]

REST and GraphQL server for [validating data received via the Telegram Mini App][Telegram Mini App].

## Usage

### Run Docker container

```sh
ducker run bigslycat/tg-app-validate-service \
  -p 80:80
  -e BOT_TOKEN='...'
```

### GraphQL

You can send GraphQL requests to path `/graphql` and use GraphiQL playground on server root.

#### GraphQL schema

```gql
type Query {
  userData(initData: String!): WebAppUser!
}

# WebAppUser https://core.telegram.org/bots/webapps#webappuser
type WebAppUser {
  id: Int!
  isBot: Boolean
  firstName: String!
  lastName: String
  username: String
  languageCode: String
  isPremium: Boolean
  addedToAttachmentMenu: Boolean
  allowsWriteToPm: Boolean
  photoUrl: String
}
```

### REST

You can send GET request to path `/parse` with `initData` in query string as is and receive `WebAppUser` JSON object in response:

```http
GET /parse?<initData>
```

[Docker image workflow]: https://github.com/bigslycat/tg-app-validate-service/actions/workflows/docker-image.yml
[Docker image workflow badge]: https://github.com/bigslycat/tg-app-validate-service/actions/workflows/docker-image.yml/badge.svg
[Telegram Mini App]: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
