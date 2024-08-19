import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import LaunchItem from './LaunchItem';

const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int!, $offset: Int!) {
    launches(limit: $limit, offset: $offset) {
      id
      mission_name
      rocket {
        rocket_name
      }
      launch_site {
        site_name
      }
    }
  }
`;

const LaunchList: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: { limit: 10, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      loadMoreLaunches();
    }
  };

  const loadMoreLaunches = () => {
    fetchMore({
      variables: {
        offset: data.launches.length,
      },
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="launch-list">
      {data.launches.map((launch: any) => (
        <LaunchItem key={launch.id} launch={launch} />
      ))}
    </div>
  );
};

export default LaunchList;