import React from 'react';

interface LaunchItemProps {
  launch: {
    id: string;
    mission_name: string;
    rocket: {
      rocket_name: string;
    };
    launch_site: {
      site_name: string;
    };
  };
}

const LaunchItem: React.FC<LaunchItemProps> = ({ launch }) => {
  return (
    <div className="launch-item">
      <h3>{launch.mission_name}</h3>
      <p><strong>Rocket:</strong> {launch.rocket.rocket_name}</p>
      <p><strong>Launch Site:</strong> {launch.launch_site.site_name}</p>
      <p><strong>ID:</strong> {launch.id}</p>
    </div>
  );
};

export default LaunchItem;