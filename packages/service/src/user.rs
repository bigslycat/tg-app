use crate::types::ParseError;
use async_graphql::SimpleObject;
use hex::decode as decode_hex;
use hmac::Mac;
use hmac::{digest::CtOutput, Hmac};
use serde::{Deserialize, Serialize};
use serde_json::from_str;
use sha2::Sha256;
use std::collections::BTreeMap;
type HmacSha256 = Hmac<Sha256>;

#[derive(Debug, Clone, Serialize, Deserialize, SimpleObject)]
pub struct User {
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

impl User {
    pub fn from_query(
        bot_token: &String,
        mut data: BTreeMap<String, String>,
    ) -> Result<User, ParseError> {
        println!("{:?}", data);

        let user_data = data.get("user").ok_or(ParseError::NoUserProperty)?.clone();

        let hash_expected_hex = data.get("hash").ok_or(ParseError::NoHashProperty)?;
        let hash_expected_bytes = decode_hex(&hash_expected_hex)?;

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

        let deserialized = from_str::<User>(&user_data)?;

        Ok(deserialized)
    }
}
