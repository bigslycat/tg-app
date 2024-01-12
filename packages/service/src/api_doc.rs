use crate::types::ErrorResponseBody;
use crate::user::{ChatType, WebAppInitData, WebAppUser};
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(crate::routes::parse_request),
    info(
        title = "tg-app-validate",
        description = "Service for validating data received via the Telegram Mini App"
    ),
    components(schemas(ChatType, ErrorResponseBody, WebAppInitData, WebAppUser))
)]
pub struct ApiDoc;
