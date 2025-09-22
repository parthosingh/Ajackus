# User Management Dashboard
# Deployed Link: https://ajackus-two-mu.vercel.app/

# 📌 Objective
A web application built to manage user details through CRUD operations **(Create, Read, Update, Delete)** using a mock backend API. The project showcases pagination, search, filtering, sorting, and a responsive UI, demonstrating proficiency in React development and code organization.

---
# 🚀 Features

- **View Users**: Fetch and display user details (ID, First Name, Last Name, Email, Department) from the JSONPlaceholder /users endpoint.
- **Add User**: Create new users via a form with client-side validation (POST request).
- **Edit User**: Update existing user details through a form (PUT request).
- **Delete User**: Remove users with a confirmation action (DELETE request).
- **Pagination**: Navigate pages with Previous/Next buttons and selectable page sizes (10, 25, 50, 100).
- **Search**: Perform case-insensitive search across all user fields (ID, First Name, Last Name, Email, Department).
- **Sorting**: Sort table columns (ID, First Name, Last Name, Email, Department) in ascending or descending order.
- **Filter Popup**: Filter users by First Name, Last Name, Email, or Department with a modal interface.
- **Responsive UI**: Optimized for desktop, tablet, and mobile devices using CSS.
- **Unit Tests**: Comprehensive tests for all components using Vitest and React Testing Library.
- **Error Handling**: User-friendly error messages for API failures and form validation.


## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Pure CSS
- **HTTP Requests**: Native Fetch API
- **Testing**: Vitest 3.2.4, React Testing Library 16.3.0, Jest-DOM 6.8.0
- **Backend API**: JSONPlaceholder


## ⚙️ Functionality


- **View Users**: Fetches user data via GET /users and displays in a paginated table.
- **Add User**: Submits new user data via POST /users with client-side validation.
- **Edit User**: Updates user data via PUT /users/:id using a prefilled form.
- **Delete User**: Deletes a user via DELETE /users/:id with local state updates.
- **Pagination**: Supports page navigation with Previous/Next buttons and page size selection.
- **Search & Filter**: Case-insensitive search and filtering across multiple fields.
- **Sorting**: Click column headers to sort in ascending or descending order.

⚠️ Note: JSONPlaceholder is a mock API, so data changes (add/edit/delete) are simulated and not persisted.

# 🧾 Validations & Error Handling

Form Validation:
```
- Required fields: First Name, Last Name, Email, Department.
- Email format validation using regex (\S+@\S+\.\S+).
- Error messages displayed below each field.
```

API Error Handling:
Displays user-friendly error messages for failed API requests (e.g., "Failed to fetch users").


Client-Side State Management:
Local state updates simulate persistent changes for add/edit/delete operations.


# ▶️ Getting Started
```bash
Clone the Repository
git clone https://github.com/<your-username>/user-management-dashboard
cd user-management-dashboard
```

# Install Dependencies
npm install

# Run the Project
npm run dev


# Build for Production
npm run build




# 📂 Folder Structure

```
user-management-dashboard/
├── public/
│   ├── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── UserTable.jsx   # Table component
│   │   ├── UserTable.css   # Table styles
│   │   ├── UserForm.jsx    # Form for adding/editing users
│   │   ├── UserForm.css    # Form and filter popup styles
│   │   ├── FilterPopup.jsx # Filter popup component
│   │   ├── Pagination.jsx  # Pagination controls
│   │   ├── Pagination.css  # Pagination styles
│   ├── App.jsx             # Main app component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles
│   ├── main.jsx            # React entry point
├── tests/
│   ├── App.test.jsx        # Tests for App component
│   ├── UserTable.test.jsx  # Tests for UserTable component
│   ├── UserForm.test.jsx   # Tests for UserForm component
│   ├── FilterPopup.test.jsx# Tests for FilterPopup component
│   ├── Pagination.test.jsx # Tests for Pagination component
│   ├── setup.js            # Vitest setup
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
├── .gitignore              # Git ignore file
├── .gitattributes          # Enforce LF line endings
├── vite.config.js          # Vite configuration

```

## 🧪 Testing

Framework: Vitest with React Testing Library and Jest-DOM.
Test Cases: 16 tests covering:
Rendering of dashboard, table, form, filter popup, and pagination.
Form validation (required fields, email format).
Pagination functionality (Previous/Next buttons, active page).


## Run tests with: 
``
npm run test
```


```
## 📌Assumptions  

User names from JSONPlaceholder are split by space; last name defaults to 'N/A' if not present.
Department is derived from company.name.
JSONPlaceholder’s non-persistent nature requires local state for add/edit/delete simulations.
Pagination supports 10, 25, 50, 100 rows per page with Previous/Next navigation.
Search and filters are case-insensitive and applied client-side.
Modal-based UI for forms and filters, reusing styles for DRY.
No theme toggle implemented (optional feature not included).


## 🛠️ Development Notes
```
Code Quality: ESLint enforces consistent style (2-space indentation, single quotes, LF line endings).
Commit History: Clean commits for scaffolding, features, tests, and fixes.
Responsive Design: CSS ensures usability across devices.
Error Handling: Robust handling for API failures and form validation.
```

## 🌐 Deployment
```
Deployed on Vercel: https://ajackus-two-mu.vercel.app/
Run locally with npm run dev or build for production with npm run build.
```



## 🙌 Acknowledgments

- JSONPlaceholder for providing a free mock API.
- Vite for fast development and build tooling.
- React Testing Library and Vitest for robust testing.
