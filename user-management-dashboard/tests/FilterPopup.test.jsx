import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterPopup from '../src/components/FilterPopup';

// Tests for the FilterPopup component
describe('FilterPopup Component', () => {
  // Verify filter popup renders with title and input placeholders
  test('renders filter popup', () => {
    render(<FilterPopup filters={{ firstName: '', lastName: '', email: '', department: '' }} onFilterChange={() => {}} onApply={() => {}} onClear={() => {}} onClose={() => {}} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Department')).toBeInTheDocument();
  });
});