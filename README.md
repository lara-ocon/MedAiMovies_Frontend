# MedAiMovies Frontend

This README provides the necessary instructions to get the MedAiMovies frontend up and running, along with an explanation of how it interacts with the backend API. It details the installation process, available scripts, and a brief description of the project structure.

---


https://github.com/lara-ocon/MedAiMovies_Frontend/assets/112928240/be250487-aff7-4692-991f-ab931705c9a7

[Wath video in Google Drive](https://drive.google.com/file/d/15gQoJTe20PseySbKAEZs_FACHSNanDel/view?usp=sharing)

## Project Overview

MedAiMovies is a React application designed to provide a web interface for exploring movie details, reviews, and managing user accounts. The frontend interacts with a Django RESTful API backend to retrieve and store data, making it a full-fledged web application. The frontend is responsible for presenting data to the users and sending user input back to the backend.

**Note:** For the frontend application to function correctly, the backend server must be running. You can find the backend setup and repository [here](https://github.com/lara-ocon/MedAiMovies_Backend.git).

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- **Node.js and npm**: Ensure Node.js and npm are installed on your system. You can

download and install them from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the repository**: First, clone the MedAiMovies Frontend repository to your local machine using the following command:
   ```bash
   git clone https://github.com/lara-ocon/MedAiMovies_Frontend.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd MedAiMoviesApp
   ```

3. **Install dependencies**: Run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode**: To start the server in development mode, run:
  ```bash
  npm run dev
  ```
  This command uses Vite as the build tool and provides hot reloading for development.

- **Production Build**:
  - Build the project for production using:
    ```bash
    npm run build
    ```

- **General Start**:
  - To simply start the project if you've already built it or just want to run in a simpler mode:
    ```bash
    npm start
    ```

## Project Structure

- **src/**: Contains all the JavaScript and CSS code written in React.
  - **components/**: Reusable UI components like `Movie`, `Header`, and others.
  - **pages/**: React components that correspond to different pages/routes.
  - **App.jsx**: The root React component that handles routing.
  - **index.html**: The entry HTML file.
- **public/**: Public assets like images and icons.
- **node_modules/**: Contains all project dependencies installed via npm.
- **package.json**: Keeps track of all dependencies and scripts.

## Features

- **User Authentication**: Login and registration functionality.
- **Movie Listings**: View a list of movies and search for movies based on different criteria.
- **Movie Details**: Detailed view of each movie including reviews.
- **User Profile Management**: Users can view and edit their profiles.

## Interaction with the Backend

The frontend communicates with the MedAiMovies Backend to fetch and send data. Make sure the backend server is running on `https://medaimovies-backend.onrender.com` or update the base URL in the frontend's configuration if your backend is running on a different address.

hosted differently. This connection is crucial for functionalities like:

- **Fetching movie lists and details**: The frontend requests data from the backend and displays it to the users.
- **Handling user authentication**: Login and registration requests are sent to the backend, which then handles user authentication and session management.
- **Posting reviews**: Users can write and submit reviews for movies, which are then stored in the backend database.
- **User profile updates**: Any changes made to user profiles through the frontend are updated in the backend.

Ensure that the backend API is accessible and correctly configured to respond to requests from the frontend for seamless operation.

## Additional Notes

- The frontend uses React Router for navigation and routing to different components.
- State management is handled using React Context for global state like user authentication.
- The application's responsiveness and interactivity are enhanced with the use of modern JavaScript features and React capabilities.

By following these setup instructions and understanding the interaction between the frontend and backend, you should be able to run and develop the MedAiMovies application effectively. For more detailed information about specific functionalities or troubleshooting, refer to the comments and documentation within the codebase or the issues section of the repository.
