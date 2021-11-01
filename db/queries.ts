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

// TODO: delete UID
export const add_user = gql`
mutation UserAdd($images: jsonb!, $id: uuid!) {
  insert_users_one(object: {id: $id, next_index: 1, images: $images}) { # TODO: generate ID
    id
    images
    next_index
  }
}
`

export const get_user_info = gql`
query GetUserInfo($id: uuid!) {
  users_by_pk(id: $id) {
    images
    id
    next_index
  }
}
`

export const increment_user_submissions = gql`
mutation IncrementUserSubmission($id: uuid!) {
  update_users_by_pk(pk_columns: {id: $id}, _inc: {next_index: 1}) {
    next_index
    id
  }
}
`

export const update_attention_checks = gql`
mutation UpdateAttentionChecks($uid: uuid!, $att_0: Boolean!, $att_1: Boolean!, $att_2: Boolean!) {
  update_users_by_pk(pk_columns: {id: $uid}, _set: {att_0: $att_0, att_1: $att_1, att_2: $att_2}) {
    att_0
    att_1
    id
    att_2
    next_index
  }
}
`
