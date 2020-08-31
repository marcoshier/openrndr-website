import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionResult from '~/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

export default ({req, app}) => {
    return {
      httpEndpoint: process.env.ENDPOINT || "<Your GraphQL Endpoint URI>",
      getAuth: () => process.env.AUTH_TOKEN,
      cache: new InMemoryCache({ fragmentMatcher })
    }
}
