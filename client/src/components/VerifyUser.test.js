import React from 'react';
import { render } from '@testing-library/react';
import VerifyUser from './VerifyUser';

// Mocking the useNavigate and useAuth0 hooks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      sub: 'test-sub',
      name: 'Test User',
      email: 'test@example.com',
    },
  }),
}));
jest.mock('../AuthTokenContext', () => ({
  useAuthToken: () => ({
    accessToken: 'test-access-token',
  }),
}));

// Mocking fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ auth0Id: 'test-auth0-id' }),
    ok: true,
  })
);

describe('VerifyUser Component', () => {
  test('verifies user and navigates to /app', async () => {
    const { navigate } = require('react-router-dom');
    render(<VerifyUser />);
    
    // Verify that fetch function is called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/verify-user`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-access-token',
        },
        body: JSON.stringify({
          auth0Id: 'test-sub',
          name: 'Test User',
          email: 'test@example.com',
        }),
      })
    );

    // Verifying the navigation to /app
    expect(navigate).toHaveBeenCalledWith('/app');
  });
});
