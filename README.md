# Social-Media-API
The Social Media API is a backend service built using Node.js, Express, and MongoDB Atlas. It provides functionalities for user registration, authentication, creating posts, liking posts, and managing user profiles. Users can register, log in, create posts, like and dislike posts, and update their profile information. The API is designed to facilitate social interactions and content sharing within a community.

Key Features:

User Registration and Authentication
Create and Manage Posts
Like and Dislike Posts
Update User Profile Information
Basic Error Handling and Validation
Technologies Used:

Node.js
Express
MongoDB Atlas
Endpoints:

/api/auth - Handles user registration and authentication.
/api/posts - Manages posts creation, likes, and dislikes.
/api/users - Manages user profiles and interactions.


## Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:
    MONGODB_URI=mongodb+your_actual_uri.net
   PORT=4005


