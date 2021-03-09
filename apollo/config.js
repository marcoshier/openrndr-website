import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionResult from '~/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

export default ({req, app}) => {
    return {
      httpEndpoint: 'https://graphql.datocms.com',
      getAuth: () => 'a062c88e12d211da4cc3c596601b03',
      cache: new InMemoryCache({ fragmentMatcher })
    }
}
