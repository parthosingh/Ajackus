import React from 'react';
import './UserForm.css'; // Reuse modal styles to follow DRY principle

// Component for filter popup
// Allows filtering users by firstName, lastName, email, and department
function FilterPopup({ filters, onFilterChange, onApply, onClear, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Filters</h2>
        <input
          name="firstName"
          placeholder="First Name"
          value={filters.firstName}
          onChange={onFilterChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={filters.lastName}
          onChange={onFilterChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={onFilterChange}
        />
        <input
          name="department"
          placeholder="Department"
          value={filters.department}
          onChange={onFilterChange}
        />
        {/* Buttons to apply, clear, or close the filter popup */}
        <button onClick={onApply}>Apply</button>
        <button onClick={onClear}>Clear</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default FilterPopup;