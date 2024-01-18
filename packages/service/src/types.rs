use hex::FromHexError;
use rocket::{
    fairing::{Fairing, Info, Kind},
    http::{Header, Status},
    serde::json::Json,
    Request, Responder, Response,
};
use serde::Serialize;
use serde_json::error::Error as SerdeJsonError;
use std::env::var;
use utoipa::ToSchema;

#[derive(Clone)]
pub struct Env {
    pub bot_token: String,
}

#[derive(Debug)]
pub enum ParseError {
    WrongData,
    NoProperty { name: String },
    ParsePropertyError { name: String, value: String },
    SerializationError(SerdeJsonError),
    FromHexError(FromHexError),
}

impl ParseError {
    pub fn to_string(&self) -> String {
        match self {
            ParseError::WrongData => "Validation failed".to_string(),
            ParseError::SerializationError(error) => error.to_string(),
            ParseError::FromHexError(error) => error.to_string(),
            ParseError::NoProperty { name } => format!("Missing `{}` property", name),
            ParseError::ParsePropertyError { name, value } => {
                format!(
                    "Property `{}` parsing failed. Raw value:\n\n{}",
                    name, value
                )
            }
        }
    }
}

impl From<SerdeJsonError> for ParseError {
    fn from(value: SerdeJsonError) -> Self {
        ParseError::SerializationError(value)
    }
}

impl From<FromHexError> for ParseError {
    fn from(value: FromHexError) -> Self {
        ParseError::FromHexError(value)
    }
}

#[derive(Responder)]
#[response(content_type = "json", status = 400)]
pub struct ErrorResponse {
    pub inner: (Status, Json<ErrorResponseBody>),
}

#[derive(Serialize, ToSchema)]
pub struct ErrorResponseBody {
    pub message: String,
}

impl From<ParseError> for ErrorResponse {
    fn from(error: ParseError) -> Self {
        ErrorResponse {
            inner: (
                Status::BadRequest,
                Json(ErrorResponseBody {
                    message: error.to_string(),
                }),
            ),
        }
    }
}

pub struct Cors;

#[rocket::async_trait]
impl Fairing for Cors {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new(
            "Access-Control-Allow-Origin",
            var("ACCESS_CONTROL_ALLOW_ORIGIN")
                .ok()
                .unwrap_or("*".to_string()),
        ));

        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            var("ACCESS_CONTROL_ALLOW_METHODS")
                .ok()
                .unwrap_or("POST, GET, OPTIONS".to_string()),
        ));
        response.set_header(Header::new(
            "Access-Control-Allow-Headers",
            var("ACCESS_CONTROL_ALLOW_HEADERS")
                .ok()
                .unwrap_or("POST, GET, OPTIONS".to_string()),
        ));

        response.set_header(Header::new(
            "Access-Control-Allow-Credentials",
            var("ACCESS_CONTROL_ALLOW_CREDENTIALS")
                .ok()
                .unwrap_or("true".to_string()),
        ));
    }
}
