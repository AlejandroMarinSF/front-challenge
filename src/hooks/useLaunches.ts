// src/hooks/useLaunches.ts

import { gql, useQuery } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int!, $after: String) {
    launches(pageSize: $limit, after: $after) {
      launches {
        id
        site
        mission {
          name
          missionPatch(size: LARGE)
        }
        rocket {
          name
          type
        }
        isBooked
      }
      cursor
      hasMore
    }
  }
`;

export const useLaunches = (limit: number) => {
  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: { limit, after: null },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreLaunches = () => {
    if (data?.launches.hasMore) {
      fetchMore({
        variables: {
          after: data.launches.cursor,
          limit,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;

          return {
            launches: {
              __typename: prevResult.launches.__typename,
              cursor: fetchMoreResult.launches.cursor,
              hasMore: fetchMoreResult.launches.hasMore,
              launches: [
                ...prevResult.launches.launches,
                ...fetchMoreResult.launches.launches,
              ],
            },
          };
        },
      });
    }
  };

  return {
    loading,
    error,
    launches: data?.launches.launches || [],
    hasMore: data?.launches.hasMore,
    cursor: data?.launches.cursor,
    fetchMoreLaunches,
  };
};