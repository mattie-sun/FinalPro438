#📚 Rate My Class
HCDE438 FinalPro438 

A student-built React web application designed to make course planning easier by allowing users to browse, search, and review university classes. Inspired by RateMyProfessor, this app focuses on course-specific feedback rather than instructor ratings.

This project is essentially a take on Rate My Professors, but for classes. 

---

## 🚀 Project Overview

The goal of this project was to apply full-stack web development skills by creating a class review platform with real-time database functionality. The app allows users to:
- Search for classes by school or subject
- View aggregated course reviews
- Navigate to detailed pages for each class
- (Planned) Submit anonymous reviews with a rating system

This project was built as the final for a university web development course and reflects a culmination of skills in front-end React development, backend data management, and UI design.

---

## 🛠️ Technologies Used

- **React** – Front-end framework
- **Firebase (Firestore)** – Backend-as-a-Service (data storage, authentication)
- **React Router** – Client-side routing
- **CSS Modules / Custom Styling** – Component-based styling
- **JSX** – For modular UI logic
- **WebStrom** – Development environment
- **Bootstrap** – For styling

---

## 🧰 Setup and Installation
npm install

# Start the development server
npm run dev

# Deployment
npm run build

App is hosted on firestorm: 
firestorm deploy

# Known Issues
The search functionality doesnt work- it simply makes a call to the class list and populates the results page with the return. 

The general ratings that are supposed to populate on the class search cards and within the class info page where you are able to leave a review. 


# Future plans 
* Add more classes
* Implement a more refined search function
* Sort classes that populate the results page by relevance to the input query
* Adding tags that relate to the classes, indicated by the users, and  applicable via the user's reviews
