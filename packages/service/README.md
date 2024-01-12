# [tg-app-validate-service]

[![Publish Docker image][Docker image workflow badge]][Docker image workflow]

REST and GraphQL server for [validating data received via the Telegram Mini
App][Telegram Mini App].

## Usage

### Run Docker container

We use this [docker image]:

```sh
ducker run bigslycat/tg-app-validate-service \
  -p 80:80 \
  -e BOT_TOKEN='...'
```

### GraphQL

You can send GraphQL requests to path `/graphql` and use GraphiQL playground on
server root.

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

You can send GET request to path `/parse` with `initData` in query string as is
and receive `WebAppUser` JSON object in response:

```http
GET /parse?<initData>
```

#### OpenAPI

You can use OpenAPI in 3 ways:

- [Swagger-UI]. Just set `SWAGGER_UI` env variable:

  ```sh
  ducker run bigslycat/tg-app-validate-service \
    -p 80:80 \
    -e BOT_TOKEN='...'
    -e SWAGGER_UI=true
  ```

  And you can get the documentation this path: `/swagger-ui`.

- [RapiDoc]. Set `RAPIDOC` env variable:

  ```sh
  ducker run bigslycat/tg-app-validate-service \
    -p 80:80 \
    -e BOT_TOKEN='...'
    -e RAPIDOC=true
  ```

  And you can get the documentation this path: `/rapidoc`.

- [Redocly]. Set `REDOC` env variable:

  ```sh
  ducker run bigslycat/tg-app-validate-service \
    -p 80:80 \
    -e BOT_TOKEN='...'
    -e REDOC=true
  ```

  And you can get the documentation this path: `/redoc`.

[docker image]: https://hub.docker.com/r/bigslycat/tg-app-validate-service
[tg-app-validate-service]:
  https://github.com/bigslycat/tg-app/tree/main/packages/service#readme
[Swagger-UI]: https://swagger.io/tools/swagger-ui/
[RapiDoc]: https://rapidocweb.com
[Redocly]: https://redocly.com
[Docker image workflow]:
  https://github.com/bigslycat/tg-app-validate-service/actions/workflows/docker-image.yml
[Docker image workflow badge]:
  https://github.com/bigslycat/tg-app-validate-service/actions/workflows/docker-image.yml/badge.svg
[Telegram Mini App]:
  https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
