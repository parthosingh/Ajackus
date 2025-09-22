import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

// Tests for the main App component
describe('App Component', () => {
  // Ensure the dashboard title is rendered after async fetch
  test('renders dashboard title', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('User Management Dashboard')).toBeInTheDocument(), { timeout: 2000 });
  });

  // Verify search input is present after async render
  test('renders search input', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument(), { timeout: 2000 });
  });

  // Check for filter, add user, and pagination controls after async render
  test('renders filter, add user, and pagination controls', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Filter')).toBeInTheDocument();
      expect(screen.getByText('Add User')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument(); // Pagination dropdown
    }, { timeout: 2000 });
  });
});