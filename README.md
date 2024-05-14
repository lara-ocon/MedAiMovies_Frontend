### MedAiMovies Frontend

This README provides the necessary instructions to get the MedAiMovies frontend up and running. It details the installation process, available scripts, and a brief description of the project structure.

---

## Project Overview

MedAiMovies is a React application that provides a web interface for exploring movie details, reviews, and managing user accounts. It interfaces with a Django RESTful API backend to retrieve and store data.

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager) must be installed on your machine. To check if you have Node.js and npm installed, run the following commands in your terminal:
  ```bash
  node --version
  npm --version
  ```
  If these commands do not return versions, you will need to install Node.js and npm. Visit [Node.js official site](https://nodejs.org/) to download and install them.

### Installation

1. **Clone the Repository**

   To get started, clone the project repository to your local machine:
   ```bash
   git clone https://your-repository-link
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd MedAiMoviesApp
   ```

3. **Install Dependencies**

   Run the following command to install the project dependencies:
   ```bash
   npm install
   ```

### Available Scripts

In the project directory, you can run:

- **`npm start`**

  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

- **`npm run build`**

  Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

- **`npm run dev`**

  Alias for `npm start`, to run the project in development mode.

### Project Structure

- `src/`: Contains the source files for the application.
  - `App.jsx`: The main React component that holds the core layout and routing logic.
  - `AuthContext.jsx`: Manages the authentication state throughout the app.
  - `Movie.jsx`, `MovieListPage.jsx`, `MovieDetailPage.jsx`: Components for displaying movies and their details.
  - `SearchPage.jsx`: Handles the search functionality.
  - `Login.jsx`, `Register.jsx`, `UserInfo.jsx`: Components for user authentication and account management.
  - `Header.jsx`, `Footer.jsx`: Layout components used across multiple pages.
- `public/`: Contains the static assets like images and the `index.html` file.
- `node_modules/`: Contains all the npm packages installed.
- `package.json`: Holds various metadata relevant to the project including dependency list and available script commands.
- `README.md`: The file that you are currently reading that provides documentation for the project.

### Additional Information

- **Environment Variables**
  
  You may need to set up environment variables to manage settings like API endpoints. These should be placed in a `.env` file in the root directory.

- **Deployment**
  
  Refer to deployment guides based on your hosting provider (like Vercel, Netlify, or AWS) for instructions on deploying the React application.

### Support

For more information or help with setup, please refer to the documentation or contact the support team.

---

This guide aims to provide you with all the details required to start working with the MedAiMovies frontend project.