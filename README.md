<h1 align="center">Social Network Project</h1>
## Table of Contents
1. [Introduction](#introduction)
2. [Description](#description)
    2.1 [Project Requirements](#project-requirements)
3. [Technologies](#technologies)
    3.1 [Endpoints](#endpoints)
        3.1.1 [Posts](#posts)
        3.1.2 [Likes](#likes)
        3.1.3 [Comments](#comments)
        3.1.4 [Users](#users)
4. [Installation Instructions](#installation-instructions)

---

### Introduction<a name="introduction"></a>

In the backend project, we will combine knowledge in Node.js + Express and MongoDB/Mongoose technologies to develop a social media platform.

### Description<a name="description"></a>

After analyzing the project requirements, the student is expected to develop a RESTful API capable of:

- User registration using Bcrypt.
- User login with token and middleware.
- Implementing CRUD operations.
- Liking/disliking a post.
- Making the backend available in production.

#### Project Requirements<a name="project-requirements"></a>

- Use Git branches; the final repository should have two branches: 'master' or 'main' and 'develop.'
- Present an excellent README.

### Technologies<a name="technologies"></a>

For API development, we will use MongoDB with Mongoose and Express. The project will be hosted on a public GitHub repository, and the presence of branches, along with well-documented commits, will be valued to analyze the project's evolution. A complete README in the repository is a mandatory requirement.

#### Endpoints<a name="endpoints"></a>

##### Posts<a name="posts"></a>

- Endpoint to create a post (authentication required).
- Endpoint to update a post (authentication required).
- Endpoint to delete a post (authentication required).
- Endpoint to retrieve all posts along with user information and post comments.
- Endpoint to search for posts by name.
- Endpoint to search for posts by ID.
- Implement validation for post creation to ensure all fields are filled (except for the image, which is optional), returning a message if not.
- Pagination in increments of 10.
  
##### Likes<a name="likes"></a>

- Endpoint to like a post.
- Endpoint to unlike a post.

##### Comments<a name="comments"></a>

- Endpoint to create a comment on a specific post.

##### Users<a name="users"></a>

- Endpoint to register a user using Bcrypt.
- Endpoint for login (using Bcrypt + JWT).
- Endpoint to retrieve information about the logged-in user.
- Endpoint for logout.
- Implement validation for user creation to ensure all fields are filled, returning a message if not.
- Middleware to check the authorship of a post when editing/deleting it.

### Installation Instructions<a name="installation-instructions"></a>

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and configure connection parameters.
4. Run the application with `npm start`.
5. Access the API at the specified endpoints.