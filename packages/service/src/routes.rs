use crate::{
    types::{Env, ErrorResponse},
    user::WebAppUser,
    Query,
};
use async_graphql::{http::GraphiQLSource, EmptyMutation, EmptySubscription, Schema as GqlSchema};
use async_graphql_rocket::{GraphQLQuery, GraphQLRequest, GraphQLResponse};
use rocket::{response::content, serde::json::Json, State};
use std::collections::BTreeMap;

pub type Schema = GqlSchema<Query, EmptyMutation, EmptySubscription>;

#[rocket::get("/parse?<query..>")]
pub async fn parse_request(
    env: &State<Env>,
    query: BTreeMap<String, String>,
) -> Result<Json<WebAppUser>, ErrorResponse> {
    let user = WebAppUser::from_query(&env.bot_token, query)?;
    Ok(Json(user))
}

#[rocket::get("/graphql?<query..>")]
pub async fn graphql_query(schema: &State<Schema>, query: GraphQLQuery) -> GraphQLResponse {
    query.execute(schema.inner()).await
}

#[rocket::post("/graphql", data = "<request>", format = "application/json")]
pub async fn graphql_request(schema: &State<Schema>, request: GraphQLRequest) -> GraphQLResponse {
    request.execute(schema.inner()).await
}

#[rocket::get("/")]
pub fn graphiql() -> content::RawHtml<String> {
    content::RawHtml(GraphiQLSource::build().endpoint("/graphql").finish())
}
