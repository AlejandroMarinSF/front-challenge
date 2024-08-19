import React from 'react';

interface LaunchItemProps {
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
}

const LaunchItem: React.FC<LaunchItemProps> = ({ id, site, mission, rocket, isBooked }) => {
  return (
    <div className="launch-item">
      <h3>{mission.name}</h3>
      {mission.missionPatch ? (
        <img src={mission.missionPatch} alt={`${mission.name} patch`} />
      ) : (
        <div className="no-image">No image available</div>
      )}
      <p><strong>Rocket:</strong> {rocket.name} ({rocket.type})</p>
      <p><strong>Launch Site:</strong> {site}</p>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Booked:</strong> {isBooked ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default LaunchItem;