# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



# 🌍 Tour & Travel Booking Portal

A full-featured **Tour & Travel Booking Portal** built with **ReactJS** and **Firebase**. The platform supports three roles: **Admin**, **Guide**, and **User**, each with tailored functionality.

---

## 🚀 Features

### 🛠️ Admin Panel:
Admin login/logout
Manage users (view, delete)
Manage guides
Manage travel packages (add/edit/delete)
View booking details

### 🧭 Guide Panel:
Guide login
View assigned bookings
Update tour status

### 👤 User Panel:
Browse packages
Book tours
View booking history

🔹 Technology Stack:
Frontend: ReactJS
Backend: Firebase (Firestore, Auth, Storage)
Storage: Firebase Firestore for main data, localStorage for caching user info or cart

🔹 Requirements:
Login system using Firebase Auth for Admin, Guide, and Users
Use Firebase Firestore to store all data (packages, bookings, users, admin, guides)
Store logged-in user info in localStorage
Responsive UI with Tailwind CSS

FIRBASE_API_KEY = "AIzaSyCWwg-PISrhJ4k-qRzFhjTM7dllV3GaK10"
FIRBASE_AUTH_DOMAIN = "tourism-booking-39ca2.firebaseapp.com"
FIRBASE_PROJECT_ID = "tourism-booking-39ca2"
FIRBASE_STORAGE_BUCKET = "tourism-booking-39ca2.firebasestorage.app"
FIRBASE_SENDER_ID = "1029009783078"
FIRBASE_APP_ID = "1:1029009783078:web:560a6177b2d4315baa29e7"