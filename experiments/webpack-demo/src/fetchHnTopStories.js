import request from "axios";

const fetchHnTopStories = () => {
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

  return request.get("https://www.graphqlhub.com/graphql", {
    method: "get",
    params: {
      query
    }
  });
};

export default fetchHnTopStories;

global.fetchHnTopStories = fetchHnTopStories;
