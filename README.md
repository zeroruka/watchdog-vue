# Watchdog Vue Frontend (legacy)

This project is a Vue.js frontend for the Watchdog Flask Backend. It is now discontinued and has been replaced by the SvelteKit frontend. The code is quite messy since it was my first Vue project, but it still works.

## Key Files and Directories

- main.js: This is the entry point of the application. It sets up the Vue application, configures global components, and mounts the app to the DOM. It also sets up the Axios HTTP client with default headers for authentication.

- router/index.js: This file defines the routes for the application. It uses Vue Router 4, and includes a route guard to ensure that users are authenticated before accessing certain routes.

- stores/: This directory contains the application's state management using Pinia. There are two stores defined: auth.js and scraper.js. The auth.js store handles user authentication, while the scraper.js store manages the state of a web scraper.

- components/: This directory contains Vue components used throughout the application. These components include forms for logging in and registering (Login.vue and Register.vue), a dashboard (Dashbar.vue), and components for displaying and managing URLs and listings (Urls.vue and Listings.vue).

- views/: This directory contains the main views of the application. AuthView.vue is the view for user authentication, DashboardView.vue is the main dashboard view, and AccountView.vue is the view for user account management.

- common/: This directory contains utility functions and modules used throughout the application. The auth.js module in this directory contains functions for user authentication and registration.

## Code Overview

The application uses Vue 3's Composition API for managing state and logic. State is managed using Pinia, a state management library for Vue. The application also uses VeeValidate for form validation, and Axios for making HTTP requests.

The application's routing is handled by Vue Router 4. The router is configured to ensure that certain routes can only be accessed by authenticated users.

The application's UI is built using Vue components. These components use Vue's `<script setup>` syntax for managing their internal state and logic. This syntax allows for a more concise and readable way to use the Composition API.

The application also uses CSS variables for theming and responsive design. These variables are defined in the base.css file in the assets directory.

## Detailed Code Explanation

Here are some key parts of the codebase:

- main.js: This file sets up the Vue application and the Axios HTTP client. It also sets up a request interceptor for Axios that adds an Authorization header to all requests if the user is authenticated.

- router/index.js: This file defines the routes for the application and includes a route guard that redirects unauthenticated users to the login page.

- stores/auth.js: This file defines a Pinia store for managing user authentication. The store includes a getter for checking if the user is authenticated.

- components/Login.vue: This component provides a form for users to log in. It uses VeeValidate for form validation.

- components/Register.vue: This component provides a form for users to register. It also uses VeeValidate for form validation.

- components/Dashbar.vue: This component provides a navigation bar for the dashboard. It includes a button for starting and stopping the web scraper.

- components/Urls.vue: This component provides a table for displaying and managing URLs for the web scraper.

- components/Listings.vue: This component provides a table for displaying the listings scraped by the web scraper.

- views/AuthView.vue: This view provides a form for user authentication. It includes transitions for switching between the login and register forms.

- views/DashboardView.vue: This view provides the main dashboard for the application. It includes the Dashbar, Urls, and Listings components.

- common/auth.js: This module provides functions for user authentication and registration. It uses the Axios HTTP client to make requests to the backend.

## Running the Project

To run the project, you need to have Node.js and npm installed. After cloning the repository, you can install the dependencies with `npm install`. You can then start the development server with `npm run dev`.
