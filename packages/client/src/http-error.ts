export class HttpError extends Error {
  constructor(
    readonly code: number,
    statusMessage?: string,
  ) {
    super(statusMessage)
  }
}
