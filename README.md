# CineCritic

Welcome to CineCritic! This project is a simple web application for browsing movies, inspired by IMDb. It utilizes the OMDB API to fetch movie details.

## Overview

The project allows users to browse and view details of various movies, utilizing the OMDB API for data retrieval.

### Technologies Used
- **JavaScript**
- **HTML**
- **CSS**
- **Bootstrap**: Utilized for responsive design and pre-styled components.

### Features
- **Real-time Search**: Utilizing the OMDB API, the application provides a real-time search functionality that dynamically updates search results as users type in the search input. These search results are stored in local storage, ensuring that users' search queries are preserved even if the page is refreshed or navigated away from. The length of the search query must be greater than 3 characters.

- **Favourites Management**: Users can easily manage their favourite movies by clicking on the "like" icon associated with each movie card. The state of the "like" button is synchronized across both the search results and the favourites list.

- **Synchronized Like Button**: The state of the "like" button is synchronized across both the search results and the favourites list. This means that when a user adds or removes a movie from their favourites, the change is reflected instantly in both sections of the application. Even if a user navigates back to the search results after making changes in their favourites, they will see the updated state of the "like" button for that particular movie.

- **Persistent Storage**: Favourite movies and search results are stored locally using the browser's local storage mechanism. This ensures that users' data is retained even after they close or refresh the page, providing a consistent experience across multiple sessions.
  
- **Theme Persistence**: The application's theme, whether it's in light or dark mode, is also stored in local storage. This ensures that users' preferred theme is preserved across sessions, maintaining continuity in their browsing experience.
  
- **Responsive Design**: The application is designed to be responsive and optimized for various screen sizes and devices. Whether users access the application on desktop, tablet, or mobile devices, they can expect a consistent and visually pleasing experience tailored to their device's screen size.



## Project Structure
```
cine-critic/
│
├── index.html # Main HTML file
├── movie.html # Secondary HTML file for movie details
│
├── css/
│ └── styles.css # Main CSS file for styling index.html
│
├── js/
│ ├── darkmode.js # JavaScript file for toggling dark mode
│ ├── script.js # JavaScript file for handling main page
│ └── movie.js # JavaScript file for handling movie page
│
└── img/ # Directory for images
└── placeholder.png # Placeholder image for movies without posters

```

