use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use regex::Regex;
use schema::Query;

mod user {
    include! {"./src/user.rs"}
}

mod types {
    include! {"./src/types.rs"}
}

mod schema {
    include! {"./src/schema.rs"}
}

fn main() -> Result<(), std::io::Error> {
    let schema = Schema::build(Query, EmptyMutation, EmptySubscription)
        .finish()
        .sdl();

    let regex = Regex::new("\n{2,}").unwrap();
    let res = regex.replace_all(schema.trim(), "\n\n").into_owned();

    std::fs::write("./Schema.gql", res)?;

    Ok(())
}
