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
