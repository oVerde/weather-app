# Weather App

## Overview

Welcome to the Weather App! This project is a modern, responsive weather application built using React Native and Expo. It provides users with real-time weather information and forecasts based on their chosen location.

## Features

- **Real-Time Weather Data**: Fetches current weather conditions, including temperature, humidity, wind speed, and weather descriptions.
- **5-Day Forecast**: Provides a detailed 5-day weather forecast with temperature trends and weather conditions.
- **Responsive Design**: Optimized for both mobile and web platforms, ensuring a consistent user experience across devices.
- **Dark and Light Modes**: Supports theme toggling to enhance user experience in different lighting conditions.
- **Custom Components**: Utilizes reusable components for scalability and maintainability.
- **Testing**: Incorporates unit tests to ensure reliability and robustness of the application.

## Project Structure

```

/weather-app
├── __tests__               # Test files for components and services
├── app                     # Main application components and pages
├── assets                  # Static assets like fonts and images
├── components              # Reusable UI components
├── constants               # Application-wide constants
├── hooks                   # Custom React hooks
├── services                # API service modules
├── metro.config.js         # Metro bundler configuration
├── babel.config.js         # Babel configuration
├── tamagui.config.ts       # Tamagui configuration for styling
├── tsconfig.base.json      # Base TypeScript configuration
├── tsconfig.json           # Extended TypeScript configuration
└── package.json            # Project dependencies and scripts
```

## File Rationales

- **README.md**: Provides an overview, features, and structure of the project to help users and contributors understand the application.
- **_tests_** : Contains unit tests for ensuring the correctness of components and services.
- **app/**: Houses the main application components, pages, and routing configurations.
- **assets/**: Stores static assets such as fonts and images used throughout the application.
- **components/**: Contains reusable UI components like `WeatherDisplay` and `WeatherInput` to promote DRY (Don't Repeat Yourself) principles.
- **constants/**: Defines constants like color schemes in `Colors.ts` for consistent styling across the app.
- **hooks/**: Includes custom React hooks such as `useWeather` for managing state and side effects related to fetching weather data.
- **services/**: Contains modules like `weatherService.ts` responsible for making API calls to fetch weather data.
- **metro.config.js & babel.config.js**: Configuration files for Metro bundler and Babel, respectively, to customize the build process and enable necessary plugins.
- **tamagui.config.ts**: Configures Tamagui, a styling solution used for theming and responsive design.
- **tsconfig.base.json & tsconfig.json**: TypeScript configuration files setting up compiler options and project settings for type checking and transpilation.
- **package.json**: Manages project dependencies, scripts, and configuration for tools like Jest for testing.

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/oVerde/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

### Running the Application

- **Start the development server**

  ```bash
  yarn start
  ```

- **Run on Android**

  ```bash
  yarn android
  ```

- **Run on iOS**

  ```bash
  yarn ios
  ```

- **Run on Web**

  ```bash
  yarn web
  ```

### Testing

Run unit tests with:

```bash
yarn test
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch**

   ```bash
   git checkout -b feature/new-feature
   ```

3. **Commit your changes**
4. **Push to the branch**

   ```bash
   git push origin feature/new-feature
   ```

5. **Open a pull request**

## License

This project is licensed under the MIT License.
