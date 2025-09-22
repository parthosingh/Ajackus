import React from 'react';
import './UserTable.css';

// Component to render a sortable table of users with edit/delete actions
// Receives users and callbacks as props for modularity
function UserTable({ users, sortField, sortOrder, onSort, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {/* Clickable headers for sorting, with arrows indicating sort order */}
            <th onClick={() => onSort('id')}>
              ID {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('firstName')}>
              First Name {sortField === 'firstName' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('lastName')}>
              Last Name {sortField === 'lastName' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('email')}>
              Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('department')}>
              Department {sortField === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                {/* Edit and Delete buttons trigger callbacks */}
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;