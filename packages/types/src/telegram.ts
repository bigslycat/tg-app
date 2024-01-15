export namespace Telegram {
  export interface WebView {
    initParams: WebView.InitParams
    isIframe: boolean
  }

  export namespace WebView {
    export interface InitParams {
      readonly tgWebAppData: string
      readonly tgWebAppVersion: string
      readonly tgWebAppPlatform: string
      readonly tgWebAppThemeParams: string
    }
  }

  export interface Utils {}

  export interface WebAppUser {
    id: number
    is_bot?: boolean
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    is_premium?: true
    added_to_attachment_menu?: true
    allows_write_to_pm?: true
    photo_url?: string
  }

  export enum ChatType {
    Sender = 'sender',
    Private = 'private',
    Group = 'group',
    SuperGroup = 'supergroup',
    Channel = 'channel',
  }

  export interface WebAppChat {
    id: number
    type: ChatType.Channel | ChatType.Group | ChatType.SuperGroup
    title: string
    username?: string
    photo_url?: string
  }

  export interface WebAppInitData {
    query_id?: string
    user?: WebAppUser
    receiver?: WebAppUser
    chat?: WebAppChat
    chat_type?: string
    chat_instance?: string
    start_param?: string
    can_send_after?: number
    auth_date: string
    hash: string
  }

  export interface ThemeParams {
    accent_text_color?: string
    bg_color?: string
    button_color?: string
    button_text_color?: string
    destructive_text_color?: string
    header_bg_color?: string
    hint_color?: string
    link_color?: string
    secondary_bg_color?: string
    section_bg_color?: string
    section_header_text_color?: string
    subtitle_text_color?: string
    text_color?: string
  }

  export interface MainButton {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isProgressVisible: boolean
    isActive: boolean
    show(): void
    hide(): void
    enable(): void
    disable(): void
    showProgress(leaveActive: boolean): void
    hideProgress(): void
    setParams(params: MainButton.Params): void
  }

  export namespace MainButton {
    export interface Params {
      readonly text?: string
      readonly color?: string
      readonly text_color?: string
      readonly is_active?: boolean
      readonly is_visible?: boolean
    }
  }

  export interface BackButton {
    isVisible: boolean
    show(): void
    hide(): void
  }

  export interface SettingsButton {
    isVisible: boolean
  }

  export interface HapticFeedback {
    impactOccurred(style: 'heavy' | 'light' | 'medium' | 'rigid' | 'soft'): void
    notificationOccurred(type: 'error' | 'success' | 'warning'): void
    selectionChanged(): void
  }

  export interface CloudStorage {
    setItem(
      key: string,
      value: string,
      cb?: (error: unknown, ok: boolean) => void,
    ): void

    getItem(
      key: string,
      cb: (error: unknown, value?: string | null) => void,
    ): void

    getItems(
      keys: readonly string[],
      cb: (error: unknown, values?: readonly string[] | null) => void,
    ): void

    removeItem(
      key: string,
      cb: (error: unknown, removed: boolean) => void,
    ): void

    removeItems(
      keys: readonly string[],
      cb: (error: unknown, removed: boolean) => void,
    ): void

    getKeys(cb: (error: unknown, keys?: readonly string[] | null) => void): void
  }

  export interface WebApp {
    initData: string
    initDataUnsafe: WebAppInitData
    version: string
    platform: string
    colorScheme: 'dark' | 'light'
    themeParams: ThemeParams
    isExpanded: boolean
    viewportHeight: number
    viewportStableHeight: number
    isClosingConfirmationEnabled: boolean
    headerColor: string
    backgroundColor: string
    BackButton: BackButton
    MainButton: MainButton
    SettingsButton: SettingsButton
    HapticFeedback: HapticFeedback
    CloudStorage: CloudStorage

    isVersionAtLeast(version: string): boolean
    setHeaderColor(color: string): void
    setBackgroundColor(color: string): void
    enableClosingConfirmation(): void
    disableClosingConfirmation(): void
    sendData(data: WebAppData): void
    openLink(
      url: string,
      options?: { readonly try_instant_view?: boolean },
    ): void
    openTelegramLink(url: string): void
    openInvoice(
      url: string,
      onInvoiceClose?: (invoiceStatus: InvoiceStatus) => void,
    ): void
    showPopup(
      params: PopupParams,
      onClose?: (pressedButtonId: string) => void,
    ): void
    showAlert(message: string, onClose?: () => void): void
    showAlert(message: string, onClose?: (ok: boolean) => void): void
    showScanQrPopup(
      params: ScanQrPopupParams,
      onScan?: (data: string) => void,
    ): void
    closeScanQrPopup(): void
    readTextFromClipboard(cb?: (text: string) => void): void
    requestWriteAccess(cb?: (ok: boolean) => void): void
    requestContact(cb?: (shared: boolean) => void): void
    ready(): void
    expand(): void
    close(): void

    onEvent(
      type:
        | EventType.BackButtonClicked
        | EventType.MainButtonClicked
        | EventType.PopupClosed
        | EventType.SettingsButtonClicked
        | EventType.ThemeChange
        | EventType.ViewportChanged,
      handler: () => void,
    ): void

    offEvent(
      type:
        | EventType.BackButtonClicked
        | EventType.MainButtonClicked
        | EventType.PopupClosed
        | EventType.SettingsButtonClicked
        | EventType.ThemeChange
        | EventType.ViewportChanged,
      handler: () => void,
    ): void

    onEvent(
      type: EventType.InvoiceClosed,
      handler: (event: InvoiceClosedEvent) => void,
    ): void

    offEvent(
      type: EventType.InvoiceClosed,
      handler: (event: InvoiceClosedEvent) => void,
    ): void

    onEvent(
      type: EventType.QrTextReceived,
      handler: (data: string) => void,
    ): void

    offEvent(
      type: EventType.QrTextReceived,
      handler: (data: string) => void,
    ): void

    onEvent(
      type: EventType.ClipboardTextReceived,
      handler: (data?: string | null) => void,
    ): void

    offEvent(
      type: EventType.ClipboardTextReceived,
      handler: (data?: string | null) => void,
    ): void

    onEvent(
      type: EventType.WriteAccessRequested,
      handler: (event: WriteAccessRequestedEvent) => void,
    ): void

    offEvent(
      type: EventType.WriteAccessRequested,
      handler: (event: WriteAccessRequestedEvent) => void,
    ): void

    onEvent(
      type: EventType.ContactRequested,
      handler: (event: ContactRequestedEvent) => void,
    ): void

    offEvent(
      type: EventType.ContactRequested,
      handler: (event: ContactRequestedEvent) => void,
    ): void
  }

  export interface ScanQrPopupParams {
    readonly text?: string
  }

  export interface PopupParams {
    readonly title?: string
    readonly message: string
    readonly buttons?: readonly PopupButton[]
  }

  export interface PopupButton {
    readonly id?: string
    readonly type?: PopupButtonType
    readonly text?: string
  }

  export enum PopupButtonType {
    Default = 'default',
    OK = 'ok',
    Close = 'close',
    Cancel = 'cancel',
    Destructive = 'destructive',
  }

  export interface WebAppData {
    readonly data: string
    readonly button_text: string
  }

  export enum EventType {
    ThemeChange = 'themeChanged',
    ViewportChanged = 'viewportChanged',
    MainButtonClicked = 'mainButtonClicked',
    BackButtonClicked = 'backButtonClicked',
    SettingsButtonClicked = 'settingsButtonClicked',
    InvoiceClosed = 'invoiceClosed',
    PopupClosed = 'popupClosed',
    QrTextReceived = 'qrTextReceived',
    ClipboardTextReceived = 'clipboardTextReceived',
    WriteAccessRequested = 'writeAccessRequested',
    ContactRequested = 'contactRequested',
  }

  export interface ContactRequestedEvent {
    readonly status: ContactRequestedEvent.Status
  }

  export namespace ContactRequestedEvent {
    export enum Status {
      Sent = 'sent',
      Cancelled = 'cancelled',
    }
  }

  export interface WriteAccessRequestedEvent {
    readonly status: WriteAccessRequestedEvent.Status
  }

  export namespace WriteAccessRequestedEvent {
    export enum Status {
      Allowed = 'allowed',
      Cancelled = 'cancelled',
    }
  }

  export interface InvoiceClosedEvent {
    readonly url: string
    readonly status: InvoiceStatus
  }

  export enum InvoiceStatus {
    Paid = 'paid',
    Cancelled = 'cancelled',
    Failed = 'failed',
    Pending = 'pending',
  }
}

export interface Telegram {
  readonly WebView: Telegram.WebView
  readonly Utils: Telegram.Utils
  readonly WebApp: Telegram.WebApp
}
