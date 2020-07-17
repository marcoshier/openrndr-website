export  default function() {
  return {
    httpEndpoint: 'https://graphql.datocms.com',
    getAuth: () => process.env.AUTH_TOKEN
  }
}
