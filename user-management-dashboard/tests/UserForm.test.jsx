import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../src/components/UserForm';

// Tests for the UserForm component
describe('UserForm Component', () => {
  // Verify form renders in add mode
  test('renders add user form', () => {
    render(<UserForm onSubmit={() => {}} onCancel={() => {}} />);
    expect(screen.getByText('Add User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Department')).toBeInTheDocument();
  });

  // Check validation errors for empty fields
  test('shows validation errors on submit with empty fields', () => {
    render(<UserForm onSubmit={() => {}} onCancel={() => {}} />);
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Department is required')).toBeInTheDocument();
  });
});