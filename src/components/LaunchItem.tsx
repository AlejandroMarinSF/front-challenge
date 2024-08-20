import React from 'react';

interface LaunchItemProps {
  launch: {
    id: string;
    site: string;
    mission: {
      name: string;
      missionPatch?: string | null;
    };
    rocket: {
      name: string;
      type: string;
    };
    isBooked: boolean;
  };
}

const LaunchItem: React.FC<LaunchItemProps> = ({ launch }) => {
  return (
    <div className="launch-item">
      <h3>{launch.mission.name}</h3>
      {launch.mission.missionPatch && (
        <img
          src={launch.mission.missionPatch}
          alt={`${launch.mission.name} patch`}
          style={{ width: '100px', height: '100px', maxWidth: '100%', maxHeight: '100%' }}
        />
      )}
      <p>
        <strong>Rocket:</strong> {launch.rocket.name} ({launch.rocket.type})
      </p>
      <p>
        <strong>Launch Site:</strong> {launch.site}
      </p>
      <p>
        <strong>ID:</strong> {launch.id}
      </p>
      <p>
        <strong>Booked:</strong> {launch.isBooked ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default LaunchItem;