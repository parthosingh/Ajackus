import React, { useState, useEffect } from 'react';
import './UserForm.css';

// Component for adding or editing a user
// Handles form state, validation, and API submission
function UserForm({ user, onSubmit, onCancel }) {
  // Form state initialized with user data (edit mode) or empty (add mode)
  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    email: user ? user.email : '',
    department: user ? user.department : '',
  });
  // Validation and API error messages
  const [formErrors, setFormErrors] = useState({});

  // Sync form data when editing user changes
  // Ensures form reflects the latest user data in edit mode
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        department: user.department,
      });
    }
  }, [user]);

  // Update form data and clear related validation errors
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  // Validate form inputs before submission
  // Checks for required fields and valid email format
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.department) errors.department = 'Department is required';
    return errors;
  };

  // Handle form submission with API call
  // Sends POST for add, PUT for edit, and simulates JSONPlaceholder response
  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Construct user object for JSONPlaceholder API
      const fullUser = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        username: formData.firstName.toLowerCase(), // Simple username derivation
        company: { name: formData.department },
        address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
        phone: '',
        website: '',
      };

      let response;
      if (user) {
        fullUser.id = user.id;
        response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullUser),
        });
      } else {
        response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullUser),
        });
      }

      if (!response.ok) throw new Error('Failed to save user');
      const savedUser = await response.json();
      // Pass parsed user data to parent for local state update
      onSubmit({
        id: savedUser.id || (user ? user.id : Date.now()), // Fallback ID for add mode
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        department: formData.department,
      });
    } catch (err) {
      setFormErrors({ general: err.message });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{user ? 'Edit User' : 'Add User'}</h2>
        {formErrors.general && <p className="form-error">{formErrors.general}</p>}
        <div>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && <p className="form-error">{formErrors.firstName}</p>}
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && <p className="form-error">{formErrors.lastName}</p>}
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="form-error">{formErrors.email}</p>}
          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />
          {formErrors.department && <p className="form-error">{formErrors.department}</p>}
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;