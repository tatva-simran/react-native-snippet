# react-native-code-snippet
# Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all fonts, images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `constants`: Folder to store any kind of constant that you have.
  - `context`: Folder to store state management solution for separate disconnected components.
  - `navigation`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens/features.
    - `screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles.
      - `screen.tsx`
      - `screen-styles.ts`
  - `theme`: Folder to store all the styling concerns related to the application theme (typography, color, etc).
  - `utils`: Folder to store all the common functions and helpers that you use through your app.
  - `services`: Folder to store logic, related to external API communications.
