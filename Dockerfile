FROM rust:1.74.1-alpine3.18 as builder

WORKDIR /app

COPY packages/service/src packages/service/src
COPY packages/service/Cargo.toml packages/service
COPY Cargo.lock .
COPY Cargo.toml .

RUN apk add --no-cache build-base
RUN cargo install --path packages/service

FROM alpine:3.19.0

COPY --from=builder /usr/local/cargo/bin/service /usr/local/bin/tg-app-validate

CMD ["tg-app-validate"]
