# Fruit-Lens
Fruit-Lens is a mobile application built with React Native and Expo that allows users to scan fruits using their device's camera or select images from their gallery to identify the fruit type and its freshness status. The app leverages a machine learning model (hosted on Roboflow) to analyze images and provides users with the fruit's name, freshness state, estimated time left before spoilage, and suggested recipes based on the identified fruit.
The project is part of a GitHub repository with three main folders: documentation, fruit-lens, and prototype. This README provides an overview of the application, setup instructions, usage details, and the repository's file structure.

## Table of Contents
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Repository Structure](#repository-structure)
* [Prototype](#prototype)
* [Dependencies](#dependencies)
* [Contributing](#contributing)
* [License](#license)

<h2 id="features">Features</h2>

- Camera Scanning: Use the device's camera to capture an image of a fruit for analysis.
- Gallery Selection: Select an image from the device's gallery to analyze.
- Fruit Identification: Identifies the fruit type (Apple, Banana, Orange, Pear, etc.) using a machine learning model.
- Freshness Analysis: Determines the freshness status (Fresh, SemiFresh, SemiRotten, Rotten) and estimates the time left before spoilage.
- Recipe Suggestions: Provides recipe ideas based on the identified fruit.
- User-Friendly Interface: Intuitive navigation with screens for home, scanning, processing, results, and error handling.
- Cross-Platform: Supports both iOS and Android via Expo.

<h2 id="installation">Installation</h2>
To run the Fruit-Lens application locally, follow these steps:

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI: Install globally using npm install -g expo-cli
- Expo Go: Install the Expo Go app on your iOS or Android device for testing
- A code editor (e.g., Visual Studio Code)

### Steps

Clone the Repository and navigate to the fruit-lens folder:
```
git clone <repository-url>
cd fruit-lens
```
Install Dependencies:
```
npm install
```

Start the Development Server: Run the Expo development server with the tunnel option for mobile testing:
```
npm start
```

Run on Device: Open the Expo Go app on your mobile device. Scan the QR code displayed in the terminal or browser after running npm start.

Alternatively, run on an emulator:
```
npm run android             # For Android emulator
npm run ios                 # For iOS simulator
```

<h2 id="usage">Usage</h2>

#### 1. Home Screen:

- Tap "Tap to start scanning" to use the camera for scanning a fruit.
- Tap "Use image from gallery" to select an image from your device's gallery.

#### 2. Scanner Screen:

- Point the camera at a fruit and press the camera button to capture an image.
- Use the gallery button to select an image from your device.
- Flip the camera (front/back) using the flip button if needed.

#### 3. Processing Screen:

- The app processes the image using the Roboflow API to identify the fruit and its freshness.
- You will be redirected to the results or error screen based on the analysis.

#### 4. Fruit Results Screen:

- Displays the identified fruit, its freshness status, estimated time left, and suggested recipes.
- Includes the processed image (if available).
- Tap "Go back" to return to the home screen.

#### 5. Error Results Screen:

- Shown if the analysis fails (e.g., no fruit detected or invalid prediction).
- Displays an error message and a "Go back" button to return to the home screen.

### Example of usage

![Demo del proyecto](documentation/fruit-lens-demo.gif)

<h2 id="repository-structure">Repository Structure</h2>

The GitHub repository contains three main folders: `documentation`, `fruit-lens`, and `prototype`. Below is the structure of the `fruit-lens` folder, which houses the main application code:

```
fruit-lens/
├── assets/                      
│   └── images                        # app images (e.g., logo.png, gallery-icon.png, error-icon.png)
├── screens                     
│   ├── HomeScreen.js                 # home screen component
│   ├── ScannerScreen.js              # camera and gallery scanning component
│   ├── ProcessingScreen.js           # image processing component
│   ├── FruitResultsScreen.js         # fruit analysis results component
│   └── ErrorResultsScreen.js         # error handling component
├── utils/                       
│   └── analyzeFruitImage.js          # Roboflow API integration
├── App.js                            # entry point with navigation stack
├── app.json                          # Expo configuration
├── index.js                          # registers root component for Expo
├── package.json                      # dependencies and scripts
└── package-lock.json                 # locked dependency versions
```
`documentation`: Contains progress reports, milestones, and technical notes detailing the development process.

`prototype`: Includes a Word document with a link to a Figma prototype showcasing the app's UI/UX design.

<h2 id="prototype">Prototype</h2>

The prototype folder includes a Word document describing the initial design phase of Fruit-Lens. A prototype was created using Figma to visualize the app's user interface and user experience. The document provides a link to the Figma prototype, which demonstrates the planned layout and navigation flow before development began.

<h2 id="dependencies">Dependencies</h2>

The project relies on the following key dependencies (see package.json for the full list):

- expo: Core Expo framework (~53.0.0)
- react-native: React Native framework (0.79.2)
- react: React library (19.0.0)
- @react-navigation/native and @react-navigation/stack: Navigation components
- expo-camera: Camera functionality
- expo-image-picker: Gallery image selection
- expo-image-manipulator: Image resizing and compression
- axios: HTTP requests for API calls
- react-native-paper: Material design components
- react-native-reanimated: Animations
- react-native-safe-area-context: Safe area handling
- react-native-screens: Screen optimizations

<h2 id="contributing">Contributing</h2>

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit (git commit -m "Add your feature").
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

<h2 id="license">License</h2>

This project is licensed under the MIT License. See the LICENSE file for details.
