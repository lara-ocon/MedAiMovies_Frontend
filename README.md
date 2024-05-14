# MedAiMovies Frontend

This README provides the necessary instructions to get the MedAiMovies frontend up and running, along with an explanation of how it interacts with the backend API. It details the installation process, available scripts, and a brief description of the project structure.

---

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

The frontend communicates with the MedAiMovies Backend to fetch and send data. Make sure the backend server is running on `http://127.0.0.1:8000` or update the base URL in the frontend's configuration if your backend is