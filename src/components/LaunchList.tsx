// src/components/LaunchList.tsx

import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import LaunchItem from './LaunchItem';

const GET_LAUNCHES = gql`
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

const LaunchList: React.FC = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: { limit: 10, after: null },
    notifyOnNetworkStatusChange: true,
  });

  const loadMoreLaunches = () => {
    if (data && data.launches.hasMore) {
      fetchMore({
        variables: {
          after: data.launches.cursor,
        },
      });
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      loadMoreLaunches();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="launch-list">
      {data.launches.launches.map((launch: any) => (
        <LaunchItem key={launch.id} launch={launch} />
      ))}
    </div>
  );
};

export default LaunchList;