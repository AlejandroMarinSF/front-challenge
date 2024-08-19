import React, { useEffect, lazy, Suspense } from 'react';
import { useLaunches } from '../hooks/useLaunches';

const LaunchItem = lazy(() => import('./LaunchItem'));

const LaunchList: React.FC = () => {
  const { loading, error, launches, fetchMoreLaunches } = useLaunches(10);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      fetchMoreLaunches();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, launches]);

  if (loading && launches.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="launch-list">
      <Suspense fallback={<p>Loading items...</p>}>
        {launches.map((launch: any) => (
          <LaunchItem key={launch.id} {...launch} />
        ))}
      </Suspense>
      {loading && <p>Loading more launches...</p>}
    </div>
  );
};

export default LaunchList;
