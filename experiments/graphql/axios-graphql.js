const request = require("axios")

const query = `
{
  hn {
    topStories {
      title
      id
      score
      descendants
    }
  }
}
`;

request
  .get(
    'https://www.graphqlhub.com/graphql',
    {
      method: 'get',
      params: {
        query,
      },
    },
  )
  .then((result) => {
    console.log(JSON.stringify(result.data));
  });
