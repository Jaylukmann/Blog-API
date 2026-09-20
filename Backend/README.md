# Blog-API

A RESTful backend API for creating, managing, publishing, updating, and deleting blog posts, with user authentication and media upload support.

Blog-API is a backend development project built with Node.js, Express.js, MongoDB, and Mongoose. The application follows a modular MVC architecture with dedicated controllers, routes, models, services, middleware, validators, configuration, and centralized error handling.

## 🎓 Project Information

Project: Blog-API

Type: Backend REST API

Year: 2026

Architecture: MVC

Database: MongoDB

Deployment: Render

## 🎯 Project Objective

The objective of this project is to build a production-oriented Blog Management API with:

* User registration and authentication
* JWT-based authorization
* Password hashing with bcrypt
* Blog CRUD operations
* MongoDB database integration
* Mongoose data modeling
* Request validation
* File upload support
* Cloud media storage
* Centralized error handling
* Environment-based configuration
* CORS support
* Modular backend architecture
* API testing with Postman
* Git and GitHub version control
* Cloud deployment

## ✨ Features

### Authentication

* Register a new user
* Login users
* Hash passwords securely with bcrypt
* Generate JWT authentication tokens
* Protect authenticated routes
* Validate registration and login requests

### Blog Management

* Create blog posts
* Retrieve all blog posts
* Retrieve a single blog post
* Update blog posts
* Delete blog posts
* Assign authors to posts
* Add categories
* Add tags
* Set post status
* Track blog views
* Attach media to blog posts

### User Management

* Store user profiles
* Store profile images
* Unique email addresses
* Secure password storage
* JWT-based authentication

### File Upload

* Multipart form-data support
* Multer memory storage
* File size restrictions
* File type validation
* Profile image uploads
* Blog media uploads
* Cloudinary integration

### Backend

* Express middleware
* CORS
* Request logging
* Centralized error handling
* Environment variables
* Modular services
* Input validation

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript
* ES Modules

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token
* bcrypt

### Validation

* Joi

### File Upload

* Multer
* Cloudinary

### Development Tools

* Nodemon
* dotenv
* Postman

### Version Control

* Git
* GitHub

### Deployment

* Render
* MongoDB Atlas
* Cloudinary

## 📁 Project Structure

```text
Blog-API/
│
├── config/
│   ├── blogDB.js
│   └── cloudinary.js
│
├── controllers/
│   ├── blogController.js
│   └── userController.js
│
├── middleware/
│   ├── errorHandler.js
│   ├── logger.js
│   ├── multer.js
│   └── userAuth.js
│
├── models/
│   ├── blogModel.js
│   └── userModel.js
│
├── routes/
│   ├── blogRoutes.js
│   └── userRoutes.js
│
├── services/
│   ├── blogService.js
│   └── authService.js

│
├── utils/
│   └── generateToken.js
    |__  uploadtToCloudinary.js

│
├── validators/
│   ├── validateCreateblog.js
│   └── validteEditBlog.js
    |__ validateLogin.js
    |__validateRegistration.js
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md


## 📋 Prerequisites

Before running the project, install:

* Node.js
* npm
* Git
* MongoDB or MongoDB Atlas
* Postman
* Cloudinary account

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/jaylukmann/Blog-API.git
```

### 2. Enter the project directory

```bash
cd Blog-API
```

### 3. Enter the backend directory

As the repository contains a separate backend folder:

```bash
cd Backend
```

### 4. Install dependencies

```bash
npm install
```

### 5. Configure environment variables

Create a `.env` file in the backend root directory.

```env
PORT=5050

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit `.env` to GitHub.

Add the following to `.gitignore`:

```text
.env
node_modules/
```

### 6. Start the development server

```bash
npm run dev
```

The API should start on:

```text
http://localhost:5050
```

### 7. Start the production server

```bash
npm start
```

## 🔐 Environment Variables

The application uses environment variables for database credentials, authentication secrets, server configuration, and Cloudinary credentials.

| Variable              | Description                     |
| --------------------- | ------------------------------- |
| PORT                  | Port used by the Express server |
| MONGO_URI             | MongoDB connection string       |
| JWT_SECRET            | Secret used to sign JWT tokens  |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name           |
| CLOUDINARY_API_KEY    | Cloudinary API key              |
| CLOUDINARY_API_SECRET | Cloudinary API secret           |

Never expose database credentials, JWT secrets, Cloudinary credentials, or other private keys in the repository.

## 🌐 API Base URL

### Local Development

http://localhost:5050

### Production

https://blog-api-11x3.onrender.com

### Production health check

https://blog-api-11x3.onrender.com/health


## 📡 API Endpoints

### Authentication

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/users/register` | Register a new user |
| POST   | `/users/login`    | Login a user        |

### Blog

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| POST   | `/blogs/createBlog`     | Create a blog post      |
| GET    | `/blogs/getAllBlogs`    | Retrieve all blog posts |
| GET    | `/blogs/getBlog/:id`    | Retrieve one blog post  |
| PUT    | `/blogs/editBlog/:id`   | Update a blog post      |
| DELETE | `/blogs/deleteBlog/:id` | Delete a blog post      |

Authenticated blog operations require a valid JWT token.

## 👤 Authentication

Blog-API uses JWT authentication.

After successful login, the server returns an authentication token.

Example:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

Send the token with protected requests:

```text
Authorization: Bearer JWT_TOKEN
```

The authentication middleware verifies the token before allowing access to protected resources.

## 📝 User Registration

Register a new user using:

```http
POST /users/register
```

For profile image uploads, use:

```text
Content-Type: multipart/form-data
```

Example fields:

```text
name
email
password
image
```

The profile image is uploaded to Cloudinary and the resulting media information is stored with the user profile.

## 🔑 User Login

Login using:

```http
POST /users/login
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

A successful login returns an authentication token.

Use the token to access protected blog endpoints.

## 📰 Create Blog

Create a new blog post using:

```http
POST /blogs/createBlog
```

Authenticated users must provide a valid JWT token.

For blog media uploads, use:

```text
Content-Type: multipart/form-data
```

Typical fields include:

```text
title
content
category
tags
status
media
```

The API processes the uploaded media and stores the resulting media information with the blog post.

## 📚 Get All Blogs

Retrieve all blog posts using:

```http
GET /blogs/getAllBlogs
```

The endpoint returns available blog posts from MongoDB.

## 📖 Get a Single Blog

Retrieve a blog post by MongoDB ID:

```http
GET /blogs/getBlog/:id
```

Example:

```text
GET /blogs/getBlog/64fxxxxxxxxxxxx
```

## ✏️ Edit Blog

Update an existing blog post:

```http
PUT /blogs/editBlog/:id
```

The request requires authentication.

Example:

```json
{
  "title": "Updated Blog Title",
  "content": "Updated blog content.",
  "category": "Technology",
  "status": "published"
}
```

## 🗑️ Delete Blog

Delete a blog post using:

```http
DELETE /blogs/deleteBlog/:id
```

The request requires authentication.

## 🗄️ Database Models

### User Model

The User model stores authentication and profile information.

| Field    | Type   | Description               |
| -------- | ------ | ------------------------- |
| name     | String | User's name               |
| email    | String | Unique user email         |
| password | String | Hashed password           |
| image    | String | Profile image information |

### Blog Model

The Blog model stores blog post information.

| Field    | Type     | Description           |
| -------- | -------- | --------------------- |
| title    | String   | Blog title            |
| content  | String   | Blog content          |
| author   | ObjectId | Reference to the user |
| category | String   | Blog category         |
| tags     | Array    | Blog tags             |
| status   | String   | Draft or published    |
| views    | Number   | Number of views       |
| media    | Array    | Uploaded blog media   |

The `author` field references the User model.

## ☁️ File Upload Architecture

Blog-API uses Multer to process incoming files.

The current upload flow is:

```text
Client
   ↓
Multer
   ↓
Memory Buffer
   ↓
Cloudinary
   ↓
Media URL
   ↓
MongoDB
```

Multer uses memory storage, so uploaded files are available through the request buffer before being sent to Cloudinary.

This approach avoids storing uploaded files permanently on the Render server.

## 🖼️ Profile Image Upload

User profile images are uploaded through the registration process.

Example:

```text
POST /users/register
Content-Type: multipart/form-data
```

Example form fields:

```text
name: Jimoh Lukman
email: user@example.com
password: password123
image: profile.jpg
```

The uploaded image is sent to Cloudinary.

## 🎞️ Blog Media Upload

Blog posts support media attachments through the upload middleware.

The implementation uses Multer to receive uploaded files before processing them through the configured cloud storage service.

The supported file types and maximum file size should match the current Multer configuration in the repository.

## ✅ Validation

The API validates incoming requests before processing them.

Validation includes:

* Required fields
* Email format
* Password requirements
* Blog title
* Blog content
* Blog category
* Blog status
* MongoDB IDs
* Authentication data
* Invalid request data

Joi handles request validation where configured.

Example invalid registration request:

```json
{
  "name": "",
  "email": "invalid-email",
  "password": ""
}
```

The API returns a validation error instead of processing invalid data.

## ⚠️ Error Handling

The application uses centralized error-handling middleware.

API errors return JSON responses.

Example:

```json
{
  "success": false,
  "message": "Blog not found"
}
```

Common errors include:

* Invalid request data
* Invalid MongoDB ID
* User not found
* Blog not found
* Duplicate email
* Invalid credentials
* Missing JWT token
* Invalid JWT token
* File upload errors
* Database connection errors
* Internal server errors

## 📊 HTTP Status Codes

| Status Code | Meaning                             |
| ----------- | ----------------------------------- |
| 200         | Request successful                  |
| 201         | Resource created successfully       |
| 400         | Invalid request or validation error |
| 401         | Authentication required or invalid  |
| 403         | Access denied                       |
| 404         | Resource not found                  |
| 500         | Internal server error               |

## 🧪 Testing

Use Postman or another REST API client to test the API.

### Authentication Tests

Test:

```text
POST /users/register
POST /users/login
```

Verify:

* Valid registration
* Invalid registration
* Duplicate email
* Valid login
* Invalid email
* Invalid password
* Missing credentials
* JWT generation

### Blog Tests

Test:

```text
POST /blogs/createBlog
GET /blogs/getAllBlogs
GET /blogs/getBlog/:id
PUT /blogs/editBlog/:id
DELETE /blogs/deleteBlog/:id
```

### File Upload Tests

Verify:

* Profile image upload
* Blog media upload
* File size validation
* File type validation
* Cloudinary upload
* Media URL storage

### Database Tests

Verify:

* Users are saved correctly
* Passwords are hashed
* Blogs are saved correctly
* Blog authors reference valid users
* Updates persist in MongoDB
* Deleted blogs are removed
* Media information is stored correctly

## 🌿 Git Workflow

The project uses Git and GitHub for source control.

Pull the latest changes:

```bash
git pull origin main
```

Create a feature branch:

```bash
git checkout -b feature-name
```

Check changes:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Add blog media upload"
```

Push the branch:

```bash
git push origin feature-name
```

Use clear commit messages.

Examples:

```text
Add user authentication
Add JWT middleware
Add blog controller
Add Cloudinary upload
Add blog validation
Fix login authentication
Update API documentation
```

## 🚀 Deployment

The API is designed for cloud deployment using Render.

Deployment steps:

1. Push the project to GitHub.
2. Create a MongoDB Atlas database.
3. Create a Cloudinary account.
4. Connect the GitHub repository to Render.
5. Set the correct root directory.
6. Configure the build command.
7. Configure the start command.
8. Add production environment variables.
9. Deploy the application.
10. Test the production API with Postman.

### Render Environment Variables

Add:

```env
PORT=5050
MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The actual variable names must match the names used by the application.

## 🔍 Health Check

The application provides a health endpoint:

```http
GET /health
```

Expected response:

```json
{
  "message": "Blog API is running successfully",
  "status": "OK"
}
```

Use this endpoint to confirm the server is running after deployment.

## 🔒 Security Practices

The application follows several basic backend security practices:

* Password hashing with bcrypt
* JWT authentication
* Environment variables for secrets
* Request validation
* Authentication middleware
* File type validation
* File size restrictions
* CORS configuration
* Centralized error handling
* MongoDB ID validation

Never commit:

```text
.env
JWT secrets
MongoDB credentials
Cloudinary credentials
API keys
Passwords
```

## 🎥 Project Demo

A project demonstration should cover:

1. Project introduction
2. Project architecture
3. Project structure
4. MongoDB connection
5. User registration
6. User login
7. JWT authentication
8. Blog creation
9. Blog retrieval
10. Blog update
11. Blog deletion
12. File upload
13. Cloudinary integration
14. Validation
15. Error handling
16. Postman testing
17. Render deployment

Demo video:

```text
Add demo URL here
```

## 🤝 Contribution

Contributions should follow the project's Git workflow.

1. Pull the latest changes.
2. Create a feature branch.
3. Implement the feature or fix.
4. Test the changes.
5. Commit the changes.
6. Push the branch.
7. Submit the changes for review.

Keep controllers, routes, models, services, middleware, validators, and configuration code separated according to the project architecture.

## 📄 License

This project was developed as a backend development project.

Copyright © 2026.

## 📌 Project Status

```text
Development
```

The project includes:

* User authentication
* JWT authorization
* Blog CRUD operations
* MongoDB persistence
* Mongoose models
* Request validation
* File uploads
* Cloudinary integration
* Centralized error handling
* API testing
* GitHub version control
* Render deployment

## 🔗 Repository

GitHub repository:

```text
https://github.com/jaylukmann/Blog-API
```

## 👨‍💻 Developer

Jimoh Lukman Adeyemi

Backend Developer

Technology Stack:

```text
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Joi
Multer
Cloudinary
Git
GitHub
Render
```
## Postman Documentation link


