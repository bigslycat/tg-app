use api_doc::ApiDoc;
use async_graphql::{EmptyMutation, EmptySubscription, Schema as GqlSchema};
use routes::{graphiql, graphql_query, graphql_request, openapi, parse_request};
pub use schema::Query;
use std::{
    env::var,
    net::{IpAddr, Ipv4Addr},
};
use types::{Cors, Env};
use utoipa::OpenApi;
use utoipa_rapidoc::RapiDoc;
use utoipa_redoc::{Redoc, Servable};
use utoipa_swagger_ui::SwaggerUi;

mod api_doc;
mod routes;
mod schema;
mod types;
mod user;

#[rocket::launch]
fn rocket() -> _ {
    let bot_token = var("BOT_TOKEN").expect("Environment variable `BOT_TOKEN` is not defined.");
    let port = var("PORT")
        .ok()
        .and_then(|x| x.parse::<u16>().ok())
        .unwrap_or(80);

    let env = Env { bot_token };

    let mut build = rocket::build()
        .attach(Cors)
        .configure(rocket::Config {
            port,
            address: IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)),
            ..rocket::Config::default()
        })
        .manage(env.clone())
        .manage(
            GqlSchema::build(Query, EmptyMutation, EmptySubscription)
                .data(env)
                .finish(),
        )
        .mount(
            "/",
            rocket::routes![graphql_query, graphql_request, parse_request, graphiql],
        );

    let swagger_ui = check_bool_env("SWAGGER_UI");
    let rapidoc = check_bool_env("RAPIDOC");
    let redoc = check_bool_env("REDOC");

    if swagger_ui {
        build = build.mount(
            "/",
            SwaggerUi::new("/swagger-ui/<_..>").url("/api-docs/openapi.json", ApiDoc::openapi()),
        );
    }

    if rapidoc {
        if !swagger_ui {
            build = build.mount("/", rocket::routes![openapi])
        }

        build = build.mount("/", RapiDoc::new("/api-docs/openapi.json").path("/rapidoc"));
    }

    if redoc {
        build = build.mount("/", Redoc::with_url("/redoc", ApiDoc::openapi()));
    }

    build
}

fn check_bool_env(name: &str) -> bool {
    var(name)
        .ok()
        .map(|x| x.to_lowercase())
        .eq(&Some("true".to_string()))
}
