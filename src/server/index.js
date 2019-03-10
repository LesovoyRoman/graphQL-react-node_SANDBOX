const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const app = express();
app.use(cors());

const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
    { author: "John Doe", body: "Hello world", authorId: 1 },
    { author: "Jane Doe", body: "Hi, planet!", authorId: 2 },
];

const schema = buildASTSchema(gql(require('./schema')));

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
    submitPost: ({ input: { id, author, body } }) => {
        const post = { author, body };
        let index = POSTS.length;

        if (id != null && id >= 0 && id < POSTS.length) {

            POSTS.splice(id, 1, post);
            index = id;
        } else {
            POSTS.push(post);
        }

        return mapPost(post, index);
    },
    posts: () => POSTS.map(mapPost),
    post: ({ id }) => mapPost(POSTS[id], id),
};

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

const port = process.env.PORT || 228;
app.listen(port, () => {
   console.log(`App works out on ${port}`)
});