use crate::{
    api_doc::ApiDoc,
    types::{Env, ErrorResponse},
    user::WebAppInitData,
    Query,
};
use async_graphql::{http::GraphiQLSource, EmptyMutation, EmptySubscription, Schema as GqlSchema};
use async_graphql_rocket::{GraphQLQuery, GraphQLRequest, GraphQLResponse};
use rocket::{get, post, response::content, serde::json::Json, State};
use std::collections::BTreeMap;
use utoipa::OpenApi;

pub type Schema = GqlSchema<Query, EmptyMutation, EmptySubscription>;

#[utoipa::path(
    responses(
        (status = 200, body = WebAppInitData),
        (status = 400, body = ErrorResponseBody)
    )
)]
#[get("/parse?<query..>")]
pub async fn parse_request(
    env: &State<Env>,
    query: BTreeMap<String, String>,
) -> Result<Json<WebAppInitData>, ErrorResponse> {
    let user = WebAppInitData::from_query(&env.bot_token, query)?;
    Ok(Json(user))
}

#[get("/graphql?<query..>")]
pub async fn graphql_query(schema: &State<Schema>, query: GraphQLQuery) -> GraphQLResponse {
    query.execute(schema.inner()).await
}

#[post("/graphql", data = "<request>", format = "application/json")]
pub async fn graphql_request(schema: &State<Schema>, request: GraphQLRequest) -> GraphQLResponse {
    request.execute(schema.inner()).await
}

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
    content::RawHtml(GraphiQLSource::build().endpoint("/graphql").finish())
}

#[get("/api-docs/openapi.json")]
pub fn openapi() -> String {
    ApiDoc::openapi().to_json().unwrap()
}
