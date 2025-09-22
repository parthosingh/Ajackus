import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import FilterPopup from './components/FilterPopup';
import Pagination from './components/Pagination';

// Main component orchestrating the User Management Dashboard
// Manages state, data fetching, filtering, sorting, and pagination
function App() {
  // State for all users fetched from JSONPlaceholder API
  const [users, setUsers] = useState([]);
  // State for filtered and sorted users displayed in the table
  const [filteredUsers, setFilteredUsers] = useState([]);
  // Current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Number of rows per page, with options 10, 25, 50, 100
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Search query for global search across user fields
  const [search, setSearch] = useState('');
  // Field to sort the table by (id, firstName, etc.)
  const [sortField, setSortField] = useState('id');
  // Sort order (asc or desc)
  const [sortOrder, setSortOrder] = useState('asc');
  // Filter values for firstName, lastName, email, department
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  // Controls visibility of filter popup
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  // Controls visibility of add/edit form
  const [showForm, setShowForm] = useState(false);
  // User being edited, null for add mode
  const [editingUser, setEditingUser] = useState(null);
  // Error message for API failures
  const [error, setError] = useState('');

  // Combine search, filters, and sorting to update displayed users
  // Wrapped in useCallback to stabilize for useEffect dependencies
  const applyFiltersAndSearch = useCallback((data, searchTerm, filterValues) => {
    // Filter based on filter popup inputs (case-insensitive)
    let result = data.filter(user => (
      (filterValues.firstName === '' || user.firstName.toLowerCase().includes(filterValues.firstName.toLowerCase())) &&
      (filterValues.lastName === '' || user.lastName.toLowerCase().includes(filterValues.lastName.toLowerCase())) &&
      (filterValues.email === '' || user.email.toLowerCase().includes(filterValues.email.toLowerCase())) &&
      (filterValues.department === '' || user.department.toLowerCase().includes(filterValues.department.toLowerCase()))
    ));

    // Apply global search across all fields
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.firstName.toLowerCase().includes(lowerSearch) ||
        user.lastName.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch) ||
        user.department.toLowerCase().includes(lowerSearch) ||
        user.id.toString().includes(lowerSearch)
      );
    }

    // Sort based on selected field and order
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      // Convert to numbers for ID sorting to ensure numeric comparison
      if (sortField === 'id') {
        valA = Number(valA);
        valB = Number(valB);
      } else {
        // Case-insensitive string comparison for other fields
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      return sortOrder === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
    });

    setFilteredUsers(result);
    // Reset to first page after filtering/sorting
    setCurrentPage(1);
  }, [sortField, sortOrder]);

  // Fetch users from JSONPlaceholder API and parse data
  // Wrapped in useCallback to stabilize the function reference
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      const parsedData = data.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0], // First word as firstName
        lastName: user.name.split(' ').slice(1).join(' ') || 'N/A', // Rest as lastName, default to N/A
        email: user.email,
        department: user.company.name, // Department from company.name
      }));
      setUsers(parsedData);
      // Apply filters and search to initialize filteredUsers
      applyFiltersAndSearch(parsedData, search, filters);
    } catch (err) {
      setError(err.message); // Display error to user
    }
  }, [applyFiltersAndSearch, search, filters]);

  // Fetch users on component mount to initialize the dashboard
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Update search query and reapply filters
  const handleSearchChange = e => setSearch(e.target.value);

  // Update filter values and reapply filters
  const handleFilterChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  // Apply filters and hide popup
  const applyFilters = () => setShowFilterPopup(false);

  // Clear all filters and hide popup
  const clearFilters = () => {
    setFilters({ firstName: '', lastName: '', email: '', department: '' });
    setShowFilterPopup(false);
  };

  // Toggle sort order or change sort field
  const handleSort = field => {
    setSortField(field);
    setSortOrder(sortField === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Open form in add mode
  const openAddForm = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  // Open form in edit mode with selected user
  const openEditForm = user => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Delete a user via API and update local state
  // JSONPlaceholder simulates deletion without persisting
  const handleDelete = async id => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Update users after form submission
  // Handles both add and edit modes
  const handleFormSubmit = savedUser => {
    if (editingUser) {
      setUsers(users.map(user => (user.id === editingUser.id ? savedUser : user)));
    } else {
      setUsers([...users, savedUser]);
    }
    setShowForm(false);
  };

  // Reapply filters and search whenever relevant state changes
  useEffect(() => {
    applyFiltersAndSearch(users, search, filters);
  }, [users, search, filters, applyFiltersAndSearch]);

  // Calculate indices for pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="controls">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={() => setShowFilterPopup(true)}>Filter</button>
        <button onClick={openAddForm}>Add User</button>
        <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <UserTable
        users={currentUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {showFilterPopup && (
        <FilterPopup
          filters={filters}
          onFilterChange={handleFilterChange}
          onApply={applyFilters}
          onClear={clearFilters}
          onClose={() => setShowFilterPopup(false)}
        />
      )}
      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;