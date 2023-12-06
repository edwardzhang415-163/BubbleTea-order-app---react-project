import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { useAuth0 } from '@auth0/auth0-react';

// Mock the useAuth0 hook
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    loginWithRedirect: jest.fn(),
  }),
}));

test('renders home component correctly', () => {
  render(<Home />);

  expect(screen.getByText("Edward's Bubbletea")).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Create Account')).toBeInTheDocument();
});

test('login button click calls loginWithRedirect', () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  render(<Home />);

  fireEvent.click(screen.getByText('Login'));
  expect(loginWithRedirect).toHaveBeenCalled();
});

test('enter app button click navigates to /app', () => {
  const navigate = jest.fn();

  render(<Home />);
  navigate.mockImplementation(() => {});

  fireEvent.click(screen.getByText('Enter App'));
  expect(navigate).toHaveBeenCalledWith('/app');
});

test('create account button click calls signUp', () => {
  const signUp = jest.fn();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  render(<Home />);
  signUp.mockImplementation(() => {});

  fireEvent.click(screen.getByText('Create Account'));
  expect(signUp).toHaveBeenCalled();
});
