import graphql from 'babel-plugin-relay/macro';

const MeQuery = graphql`
  query MeQuery {
    me {
      id
      firstName
      lastName
      email
      phone
      country
      updatedAt
      createdAt
    }
  }
`;

export default MeQuery;
