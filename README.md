<h1 align="center">Social Network Project</h1>

<p>In process...</p>

## Table of Contents
1. [Introduction](#introduction)
2. [Description](#description)
   2.1. [Project Requirements](#project-requirements)
3. [Technologies](#technologies)
4. [Endpoints](#endpoints)
   4.1. [Posts](#posts)
   4.2. [Likes](#likes)
   4.3. [Comments](#comments)
   4.4. [Users](#users)
5. [Production](#production)
6. [Middleware](#middleware)

### Introduction <a name="introduction"></a>

In the backend project, the goal is to combine knowledge in Node + Express technologies along with MongoDB/Mongoose for creating a social media platform.

### Description <a name="description"></a>

After analyzing the project requirements, the student is expected to develop a REST API capable of the following:

#### Project Requirements <a name="project-requirements"></a>
- User registration using Bcrypt.
- User login with token and middleware.
- CRUD operations.
- Like/unlike posts.
- Backend deployment in production.

### Technologies <a name="technologies"></a>

For API development, we will use MongoDB with Mongoose and Express. The project will be hosted on a public GitHub repository, emphasizing the use of branches and quality commits for project evolution analysis. A comprehensive README in the repository is mandatory.

### Endpoints <a name="endpoints"></a>

#### Posts <a name="posts"></a>
- Create a post (authentication required).
- Update a post (authentication required).
- Delete a post (authentication required).
- Retrieve all posts with user and comments details.
- Search posts by name.
- Search posts by ID.
- Implement validation for creating a post, ensuring all fields are filled (except for the optional image) and return a message if not.
- Pagination in sets of 10.

#### Likes <a name="likes"></a>
- Like a post.
- Unlike a post.

#### Comments <a name="comments"></a>
- Create a comment on a specific post.

#### Users <a name="users"></a>
- Register a user using Bcrypt.
- Login (using Bcrypt + JWT).
- Retrieve information of the logged-in user.
- Logout.
- Implement validation for creating a user, ensuring all fields are filled, and return a message if not.

### Production <a name="production"></a>

The backend should be deployed in a production environment.

### Middleware <a name="middleware"></a>

Implement middleware to verify the authorship of a post when editing/deleting it.