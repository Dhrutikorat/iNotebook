
# Full-Stack Development for iNotebook

This guide will help you connect an existing React frontend (`client`) with a Node.js backend (`backend`).

---

## Directory Structure

Ensure your project follows this structure:

```
inotebook/
├── backend/       # Node.js API
│   ├── index.js
│   ├── package.json
│   └── (other backend files)
│
├── client/        # React frontend
│   ├── src/
│   ├── package.json
│   └── (other frontend files)
│
└── README.md
```

---

## iNotebook Overview

**iNotebook** is a versatile note-taking and document-editing app designed for mobile, tablet, or PC. It offers the following features:

- Create and edit documents seamlessly across devices.
- Add annotations to PDFs using tools like S Pen.
- Include images within your documents for rich content creation.
- Integrate with various apps such as PDF readers, Microsoft Word, and Microsoft PowerPoint.

---

## Backend Setup (Node.js)

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Ensure all dependencies are installed:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   NODE_ENV=development
   JWT_SIGN="keeptry"
   MONGO_URL="mongodb://127.0.0.1:27017/inotebook"
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

---

## Frontend Setup (React.js)

1. **Navigate to the client folder:**
   ```bash
   cd ../client
   ```

2. **Ensure all frontend dependencies are installed:**
   ```bash
   npm install
   ```
   
3. **Start the frontend server:**
   ```bash
   npm start
   ```

---

## Running the Full Stack Application

1. Open two terminal windows:
   - One for running the backend (`cd backend && npm start`)
   - Another for running the frontend (`cd client && npm start`)

2. Visit the frontend in your browser:
   ```bash
   http://localhost:3000
   ```

---

## Troubleshooting Tips

- **CORS Issues:**  
  Ensure you have the `cors` middleware enabled in your Node.js server:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```
---

## Conclusion

You now have a connected React frontend and Node.js backend for your iNotebook application! Modify and expand your project to suit your needs.
