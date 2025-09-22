import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination';

// Tests for the Pagination component
describe('Pagination Component', () => {
  // Verify pagination buttons are rendered
  test('renders pagination buttons', () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={3} currentPage={1} onPageChange={onPageChange} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  // Check that the active page is highlighted
  test('highlights active page', () => {
    render(<Pagination totalPages={3} currentPage={2} onPageChange={() => {}} />);
    expect(screen.getByText('2')).toHaveClass('active');
  });

  // Test Previous button functionality and disable state
  test('handles Previous button', () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={3} currentPage={2} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  // Test Next button functionality and disable state
  test('handles Next button', () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={3} currentPage={2} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  // Test Previous button disabled on first page
  test('disables Previous on first page', () => {
    render(<Pagination totalPages={3} currentPage={1} onPageChange={() => {}} />);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  // Test Next button disabled on last page
  test('disables Next on last page', () => {
    render(<Pagination totalPages={3} currentPage={3} onPageChange={() => {}} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });
});