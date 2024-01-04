use hex::FromHexError;
use rocket::{http::Status, serde::json::Json, Responder};
use serde::Serialize;
use serde_json::error::Error as SerdeJsonError;

#[derive(Clone)]
pub struct Env {
    pub bot_token: String,
}

#[derive(Debug)]
pub enum ParseError {
    WrongData,
    NoHashProperty,
    NoUserProperty,
    SerializationError(SerdeJsonError),
    FromHexError(FromHexError),
}

impl ParseError {
    pub fn to_string(&self) -> String {
        match self {
            ParseError::WrongData => "Validation filed".to_string(),
            ParseError::SerializationError(error) => error.to_string(),
            ParseError::FromHexError(error) => error.to_string(),
            ParseError::NoHashProperty => "Missing `hash` property".to_string(),
            ParseError::NoUserProperty => "Missing `user` property".to_string(),
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
    inner: (Status, Json<ErrorResponseBody>),
}

#[derive(Serialize)]
struct ErrorResponseBody {
    message: String,
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
