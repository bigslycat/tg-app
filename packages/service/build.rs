#![allow(dead_code)]

use api_doc::ApiDoc;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use regex::Regex;
use schema::Query;
use utoipa::OpenApi;

mod user {
    include! {"./src/user.rs"}
}

mod types {
    include! {"./src/types.rs"}
}

mod schema {
    include! {"./src/schema.rs"}
}

mod routes {
    include! {"./src/routes.rs"}
}

mod api_doc {
    include! {"./src/api_doc.rs"}
}

fn main() -> Result<(), std::io::Error> {
    let schema = Schema::build(Query, EmptyMutation, EmptySubscription)
        .finish()
        .sdl();

    let some_n_regex = Regex::new("\n{2,}").unwrap();
    let n_with_regex = Regex::new("(^|\n)([^\n])").unwrap();
    let schema = some_n_regex
        .replace_all(schema.trim(), "\n\n")
        .into_owned()
        .replace("\t", "  ");

    std::fs::write("./Schema.gql", &schema)?;
    std::fs::write(
        "../service-gql-schema/src/schema.ts",
        [
            "import { gql } from 'graphql-tag'",
            "export const Schema = gql`",
            n_with_regex
                .replace_all(schema.as_str(), "$1  $2")
                .into_owned()
                .as_str(),
            "`\n",
        ]
        .join("\n"),
    )?;

    let open_api = ApiDoc::openapi().to_pretty_json().unwrap();

    std::fs::write("./openapi.json", open_api)?;

    Ok(())
}
