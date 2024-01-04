use crate::{
    types::{Env, ParseError},
    user::WebAppUser,
};
use async_graphql::{Context, Error as GqlError, FieldResult, Object};
use std::collections::BTreeMap;
use urlencoding::decode_binary;

pub struct Query;

#[Object(extends)]
impl Query {
    pub async fn user_data(&self, ctx: &Context<'_>, init_data: String) -> FieldResult<WebAppUser> {
        let data = init_data
            .split('&')
            .map(|s| {
                let bytes = s.as_bytes();
                let binary = decode_binary(bytes);
                let decoded = String::from_utf8_lossy(&binary).to_string();
                let splitted = decoded.split("=").collect::<Vec<_>>();
                let key = splitted.get(0).unwrap_or(&"");
                let value = splitted.get(1).unwrap_or(&"");

                (key.to_string(), value.to_string())
            })
            .filter(|(key, value)| !value.is_empty() && !key.is_empty())
            .collect::<BTreeMap<String, String>>();

        let env = ctx.data::<Env>().unwrap();
        let user = WebAppUser::from_query(&env.bot_token, data)?;
        Ok(user)
    }
}

impl From<ParseError> for GqlError {
    fn from(error: ParseError) -> Self {
        GqlError::new(error.to_string())
    }
}
