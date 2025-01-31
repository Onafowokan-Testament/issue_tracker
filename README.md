# Issue Tracker with Next.js and MongoDB 🐛

Welcome to the **Issue Tracker**! This is a full-stack application built with **Next.js** (React framework) and **MongoDB** for tracking and managing software development issues. It provides a seamless user interface for creating, updating, and resolving issues, making it an essential tool for development teams.

---

## Features

- **Create Issues**: Add new issues with a title, description, priority, and status.
- **View Issues**: Display a list of all issues with filtering and sorting options.
- **Update Issues**: Modify issue details, such as status or priority.
- **Delete Issues**: Remove issues from the tracker.
- **MongoDB Integration**: Uses MongoDB for efficient and scalable data storage.
- **Responsive UI**: Built with Next.js for a fast and responsive user experience.

---

## How It Works

1. **Create an Issue**: Users can add a new issue by filling out a form with the issue details.
2. **View Issues**: The application displays a list of all issues, allowing users to filter by status or priority.
3. **Update an Issue**: Users can edit the details of an existing issue, such as changing its status or priority.
4. **Delete an Issue**: Users can remove an issue from the tracker.

---

## Installation

To run this application locally, follow these steps:

### Prerequisites

- Node.js 16 or higher
- MongoDB
- Next.js

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/issue-tracker.git
   cd issue-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   - Ensure MongoDB is installed and running.
   - Create a `.env.local` file in the root directory and add your MongoDB connection string:
     ```plaintext
     MONGODB_URI=mongodb://localhost:27017/issue_tracker
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Visit `http://localhost:3000` in your browser.

---

## API Endpoints

### Create an Issue
- **Endpoint**: `POST /api/issues`
- **Request Body**:
  ```json
  {
    "title": "Bug in Login Page",
    "description": "Users cannot log in due to a validation error.",
    "priority": "High",
    "status": "Open"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Issue created successfully",
    "issue": {
      "_id": "65f4c1e2b4f4d7e8f4d7e8f4",
      "title": "Bug in Login Page",
      "description": "Users cannot log in due to a validation error.",
      "priority": "High",
      "status": "Open",
      "createdAt": "2023-10-15T12:00:00Z"
    }
  }
  ```

### Fetch All Issues
- **Endpoint**: `GET /api/issues`
- **Response**:
  ```json
  {
    "issues": [
      {
        "_id": "65f4c1e2b4f4d7e8f4d7e8f4",
        "title": "Bug in Login Page",
        "description": "Users cannot log in due to a validation error.",
        "priority": "High",
        "status": "Open",
        "createdAt": "2023-10-15T12:00:00Z"
      }
    ]
  }
  ```

### Update an Issue
- **Endpoint**: `PATCH /api/issues/{id}`
- **Request Body**:
  ```json
  {
    "status": "In Progress"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Issue updated successfully",
    "issue": {
      "_id": "65f4c1e2b4f4d7e8f4d7e8f4",
      "title": "Bug in Login Page",
      "description": "Users cannot log in due to a validation error.",
      "priority": "High",
      "status": "In Progress",
      "createdAt": "2023-10-15T12:00:00Z"
    }
  }
  ```

### Delete an Issue
- **Endpoint**: `DELETE /api/issues/{id}`
- **Response**:
  ```json
  {
    "message": "Issue deleted successfully"
  }
  ```

---

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework.
- [MongoDB](https://www.mongodb.com/) for the scalable NoSQL database.
- [React](https://reactjs.org/) for the user interface library.

---

Track and manage your development issues efficiently with the Issue Tracker! 🚀🐞
