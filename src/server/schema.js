module.exports = `
    type Query {
        posts: [Post]
        post(id: ID!): Post
    }
    
    type Mutation {
        submitPost(input: PostInput!): Post
    }
    
    type Post {
        id: ID
        author: String
        body: String
    }
    
    input PostInput {
        id: ID
        author: String!
        body: String!
    }
`;