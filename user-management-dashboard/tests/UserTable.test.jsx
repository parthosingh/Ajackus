import React from 'react';
import { render, screen } from '@testing-library/react';
import UserTable from '../src/components/UserTable';

// Tests for the UserTable component
describe('UserTable Component', () => {
  const users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', department: 'IT' },
  ];

  // Verify table headers are rendered, accounting for sort arrows
  test('renders table headers', () => {
    render(<UserTable users={users} sortField="id" sortOrder="asc" onSort={() => {}} onEdit={() => {}} onDelete={() => {}} />);
    // Use regex to match headers with optional sort arrows
    expect(screen.getByText(/ID/)).toBeInTheDocument();
    expect(screen.getByText(/First Name/)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
    expect(screen.getByText(/Department/)).toBeInTheDocument();
    expect(screen.getByText(/Actions/)).toBeInTheDocument();
  });

  // Ensure user data is displayed correctly
  test('renders user data', () => {
    render(<UserTable users={users} sortField="id" sortOrder="asc" onSort={() => {}} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();
  });
});