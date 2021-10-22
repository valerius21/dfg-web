import { gql } from "@apollo/client/core"

export const private_images_query = gql`
query PrivateImages {
  private {
    filename
    id
  }
}
`

export const aggregation = gql`
query Aggregation {
  private {
    submissions_aggregate {
      aggregate {
        count
      }
    }
    id
  }
  public {
    submissions_aggregate {
      aggregate {
        count
      }
    }
    id
  }
}
`

export const public_images_query = gql`
query PublicImages {
  public {
    filename
    id
  }
}
`

export const insert_submission = gql`
mutation InsertSubmission($acquaintance: Boolean, $colleagues: Boolean = false, $everybody: Boolean = false, $family: Boolean = false, $friends: Boolean = false, $nobody: Boolean = false, $private_picture: uuid, $public_picture: uuid, $is_private: Boolean, $sensitivity: Int!, $uid: String!) {
  insert_submissions(objects: {acquaintance: $acquaintance, colleagues: $colleagues, everybody: $everybody, family: $family, friends: $friends, nobody: $nobody, is_private: $is_private, public_picture: $public_picture, private_picture: $private_picture, sensitivity: $sensitivity, uid: $uid}) {
    affected_rows
  }
}
`