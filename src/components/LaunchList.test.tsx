import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LaunchList from './LaunchList';
import { GET_LAUNCHES } from '../hooks/useLaunches';
import React from 'react';

const mocks = [
  {
    request: {
      query: GET_LAUNCHES,
      variables: { limit: 10, after: null },
    },
    result: {
      data: {
        launches: {
          launches: [
            {
              id: '1',
              site: 'Launch Site 1',
              mission: { name: 'Mission 1', missionPatch: 'patch1.png' },
              rocket: { name: 'Rocket 1', type: 'Type 1' },
              isBooked: false,
            },
          ],
          cursor: '1',
          hasMore: true,
        },
      },
    },
  },
  {
    request: {
      query: GET_LAUNCHES,
      variables: { limit: 10, after: '1' },
    },
    result: {
      data: {
        launches: {
          launches: [
            {
              id: '2',
              site: 'Launch Site 2',
              mission: { name: 'Mission 2', missionPatch: 'patch2.png' },
              rocket: { name: 'Rocket 2', type: 'Type 2' },
              isBooked: true,
            },
          ],
          cursor: '2',
          hasMore: false,
        },
      },
    },
  },
];

test('renders launches and fetches more on scroll', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LaunchList />
    </MockedProvider>
  );

  // Check that the loading state is shown initially
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for the first launch to be rendered
  await waitFor(() => expect(screen.getByText('Mission 1')).toBeInTheDocument());

  // Simulate scroll to bottom and verify that the fetchMore function is called
  const scrollEvent = new Event('scroll');
  window.dispatchEvent(scrollEvent);

  // Wait for the loading state to appear
  await waitFor(() => expect(screen.getByText('Loading more launches...')).toBeInTheDocument());

  // Wait for the second launch to be rendered
  await waitFor(() => expect(screen.getByText('Mission 2')).toBeInTheDocument());
});