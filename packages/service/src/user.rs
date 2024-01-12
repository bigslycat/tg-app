use crate::types::ParseError;
use async_graphql::{Enum, SimpleObject};
use hex::decode as decode_hex;
use hmac::Mac;
use hmac::{digest::CtOutput, Hmac};
use serde::{Deserialize, Serialize};
use serde_json::from_str;
use sha2::Sha256;
use std::collections::BTreeMap;
use utoipa::ToSchema;

type HmacSha256 = Hmac<Sha256>;

#[derive(Debug, Clone, Serialize, Deserialize, SimpleObject, ToSchema)]
pub struct WebAppInitData {
    pub query_id: Option<String>,
    pub user: Option<WebAppUser>,
    pub receiver: Option<WebAppUser>,
    pub chat: Option<WebAppUser>,
    pub chat_type: Option<ChatType>,
    pub chat_instance: Option<String>,
    pub start_param: Option<String>,
    pub can_send_after: Option<u32>,
    pub auth_date: u64,
    pub hash: String,
}

fn get_required_property<'a>(
    map: &'a BTreeMap<String, String>,
    property: &'a str,
) -> Result<&'a String, ParseError> {
    map.get(property).ok_or(ParseError::NoProperty {
        name: property.to_string(),
    })
}

fn parse_property<T: std::str::FromStr>(
    map: &BTreeMap<String, String>,
    property: &str,
) -> Result<Option<T>, ParseError> {
    match map.get(property) {
        Some(value) => match value.parse::<T>() {
            Ok(value) => Ok(Some(value)),
            Err(_) => Err(ParseError::ParsePropertyError {
                name: property.to_string(),
                value: value.clone(),
            }),
        },
        None => Ok(None),
    }
}

fn parse_required_property<T: std::str::FromStr>(
    map: &BTreeMap<String, String>,
    property: &str,
) -> Result<T, ParseError> {
    let value = get_required_property(map, property)?;

    value.parse::<T>().or(Err(ParseError::ParsePropertyError {
        name: property.to_string(),
        value: value.clone(),
    }))
}

fn parse_user_value(
    data: &BTreeMap<String, String>,
    key: &str,
) -> Result<Option<WebAppUser>, ParseError> {
    match data.get(key) {
        Some(user_raw) => match from_str::<WebAppUser>(user_raw) {
            Ok(user) => Ok(Some(user)),
            Err(_) => Err(ParseError::ParsePropertyError {
                name: key.to_string(),
                value: user_raw.to_string(),
            }),
        },
        None => Ok(None),
    }
}

impl WebAppInitData {
    pub fn from_query(
        bot_token: &String,
        mut data: BTreeMap<String, String>,
    ) -> Result<Self, ParseError> {
        let hash = get_required_property(&data, "hash")?.clone();
        let hash_expected_bytes = decode_hex(&hash)?;

        data.remove("hash");

        let data_check_string = data
            .iter()
            .map(|(key, value)| format!("{}={}", key, value))
            .collect::<Vec<_>>()
            .join("\n");

        let mut secret_hmac_sha256: HmacSha256 = HmacSha256::new_from_slice(b"WebAppData").unwrap();
        secret_hmac_sha256.update(bot_token.as_bytes());
        let secret_finalized: CtOutput<_> = secret_hmac_sha256.finalize();
        let secret_bytes = secret_finalized.into_bytes();

        let mut hash_hmac_sha256: HmacSha256 = HmacSha256::new_from_slice(&secret_bytes).unwrap();
        hash_hmac_sha256.update(data_check_string.as_bytes());
        let hash_finalized: CtOutput<_> = hash_hmac_sha256.finalize();
        let hash_bytes = hash_finalized.into_bytes();

        if !hash_bytes.iter().eq(&hash_expected_bytes) {
            return Err(ParseError::WrongData);
        }

        let query_id = data.get("query_id").cloned();
        let user = parse_user_value(&data, "user")?;
        let receiver = parse_user_value(&data, "receiver")?;
        let chat = parse_user_value(&data, "chat")?;
        let chat_type = parse_property::<ChatType>(&data, "chat_type")?;
        let chat_instance = data.get("chat_instance").cloned();
        let start_param = data.get("start_param").cloned();
        let can_send_after = parse_property::<u32>(&data, "can_send_after")?;
        let auth_date = parse_required_property::<u64>(&data, "auth_date")?;

        Ok(WebAppInitData {
            query_id,
            user,
            receiver,
            chat,
            chat_type,
            chat_instance,
            start_param,
            can_send_after,
            auth_date,
            hash,
        })
    }
}

#[derive(Clone, Copy, Debug, Deserialize, Enum, Eq, Serialize, PartialEq, ToSchema)]
pub enum ChatType {
    #[serde(rename = "sender")]
    Sender,
    #[serde(rename = "private")]
    Private,
    #[serde(rename = "group")]
    Group,
    #[serde(rename = "supergroup")]
    SuperGroup,
    #[serde(rename = "channel")]
    Channel,
}

#[derive(Debug, PartialEq, Eq)]
pub struct ParseChatTypeError {
    value: String,
}

impl std::str::FromStr for ChatType {
    type Err = ParseChatTypeError;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        match value {
            "sender" => Ok(Self::Sender),
            "private" => Ok(Self::Private),
            "group" => Ok(Self::Group),
            "supergroup" => Ok(Self::SuperGroup),
            "channel" => Ok(Self::Channel),
            value => Err(ParseChatTypeError {
                value: value.to_string(),
            }),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, SimpleObject, ToSchema)]
pub struct WebAppUser {
    pub id: i64,
    pub is_bot: Option<bool>,
    pub first_name: String,
    pub last_name: Option<String>,
    pub username: Option<String>,
    pub language_code: Option<String>,
    pub is_premium: Option<bool>,
    pub added_to_attachment_menu: Option<bool>,
    pub allows_write_to_pm: Option<bool>,
    pub photo_url: Option<String>,
}
