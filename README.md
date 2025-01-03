### POSTAWAY - SOCIAL MEDIA BACKEND REST API

A Robust Social Media Backend REST API that empowers users to post, comment, like, send friend requests and reset their passwords using OTP for enhanced security.

## Features

- **User Management:** Register and authenticate users.
- **Post Creation:** Users can create posts with text and media.
- **Commenting:** Users can comment on posts.
- **Liking:** Users can like posts.
- **File Upload:** Supports file upload for user avatars and post images.
- **Error Handling:** Graceful handling of errors with appropriate HTTP status codes and error messages.
- **Authentication:** Implements JSON Web Tokens (JWT) for user authentication.
- **Security:** Ensures security measures like data validation and input sanitization.
- **Scalable Architecture:** Uses Express.js for a scalable and modular architecture.

## Tech Stack

   - ExpressJS - Minimalist Framework For Creating REST API's using Javascript in the Node environment.

   - MongoDB - A popular NoSQL database for storing data in a JSON like structure called Documents.

   - NodeJS - A popular Javascript runtime environment to run Javascript code outside of the browser.

## Installation

1. Clone the repository:

   - git clone https://github.com/devyani2995/Postaway_Backend_API.git
   - cd Postaway_Backend_API

2. Install dependencies: npm install

3. Start the server: npm start

## API Structure

1. **Authentication Routes**

   - **/api/users/signup** - Register a new user account.
   - **/api/users/signin** - Log in as a user
   - **/api/users/logout** - Logout the currently logged-in user

2. **User Profile Routes**
  
   - **/api/users/get-details/:userId** - Retrieve user information.
   - **/api/users/get-all-details** - Retrieve information for all users.
   - **/api/users/update-details/:userId** - Update user details.

3. **Post Routes**

   - **/api/posts/all** - Retrieve all posts form various users to compile a new feed.
   - **/api/posts/:pid** - Retrieve a specific post by id.
   - **/api/posts/** - Create a new post.
   - **/api/posts/:pid** - Delete a specific post.
   - **/api/posts/:pid** - Update a specific post.

4. **Comment Routes**
   
   - **/api/comments/all** - Retrieve all comments.
   - **/api/comments/:pid** - Get comments for a specific post.
   - **/api/comments/:pid** - Add a comments to a specific post.
   - **/api/comments/:cid** - Delete a specific comment.
   - **/api/comments/:cid** - Update a specific comment.

5. **Like Routes**

   - **/api/likes/all** - Retrieve all likes
   - **/api/likes/pcid** - Get likes for a specific post or comment.
   - **/api/likes/toggle/:pcid** - Toggle like on a post or comment.

6. **Friendship Routes**   
   
   - **/api/friends/get-friends/:userId** - Get a user's friend.
   - **/api/friends/get-pending-requests/:userId** - Get pending friend request.
   - **/api/friends/toggle-friendship/:userId** - Toggle friendship with another user.
   - **/api/friends/response-to-request/:userId** - Accept or reject a friend request.
