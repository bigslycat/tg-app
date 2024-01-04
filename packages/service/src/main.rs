use async_graphql::{EmptyMutation, EmptySubscription, Schema as GqlSchema};
use routes::{graphiql, graphql_query, graphql_request, parse_request};
pub use schema::Query;
use std::{
    env::var,
    net::{IpAddr, Ipv4Addr},
};
use types::Env;

mod routes;
mod schema;
mod types;
mod user;

#[rocket::launch]
fn rocket() -> _ {
    let bot_token = var("BOT_TOKEN").expect("Environment variable `BOT_TOKEN` is not defined.");

    let env = Env { bot_token };

    rocket::build()
        .configure(rocket::Config {
            port: 80,
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
        )
}
