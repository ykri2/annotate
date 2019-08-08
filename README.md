## README


# About

This project is a React application that can be run as a web app locally by downloading the project and running it through npm, or it can be hosted. It is a pure frontend and no web api attached, which means there is no way to save the data while running it. If you __refresh__ the page the uploaded images and annotation data will be deleted. It is a basic React/Redux web app, with Webpack as an organizer to include needed loaders to help deal with different files and bundle the javascript files into one.

The app allows users to upload images by drag and drop, flip through the images by using canvas, marking areas on the images and write down what is in that area, and export JSON or CSV files for annotation objects corresponding to images and images loaded into the applications local memory.


# Download and install

First download and install the latest stable version of [Nodejs](https://nodejs.org/en/) on your computer. Node is the only thing other than the project folder that is needed. When installing Node make sure to add npm to *PATH*. After Node is installed open the command prompt of your choice and navigate to where the project folder is located. When inside the folder run the command  *__npm install__*   if Node is installed correctly npm should start to download the necessary dependencies to run the application.



# Run application

To run the application all dependencies must be installed, when that is done run the command   npm start   and wait while the application launch in the browser at *localhost:8080*. The __‘’Start’’__ command runs the application through webpack in development mode, go to __*package.js*__ and __*webpack.config.js*__ to see more about commands to produce build bundle, deploy to Github, or specifications on launching the app and the required loaders.
 
The browser will most likely launch by itself when the app is ready to start, if not, open it and go to *localhost:8080* when it says it is ready in the command prompt.



# Tweak the application

*__Main structure of the application:__* The application is a basic react+redux+webpack project, the webpack is minimal in size and can be found at the top of the project folder, alongside the *package.js*, *.babelrc*, and *index.html*. The content of the src folder has three main sub folders to consider, the *Action folder*, *Reducer folder*, and *Components folder*. To better understand the basic structure of the app checkout more on React/Redux and Webpack. The CSS in the project is done in SCSS and loaders for those files are imported in the webpack file, the CSS is messy but just follow the nested structure.

The react router is used to navigate between pages in the application more than frequently, as a quick and dirty way to add new pages. The routes can be found at *src/Components/Root.js*, the provider links the Redux store object to the react application, and the *AppComponent* from *App.js* is imported and wrapped around all routes.

The *App.js* file is found at *src/Components/App.js* and is used as a container for holding components that are always on display, e.i, header, navigation menu, footer. The App component is wrapped around the routes making all components rendered throught specific routes appear alongside static content in *App.js* as child components.
 
*__Fabricjs:__* Fabric is used for operating canvas, adding the image as the background element, and adding shapes through built in classes in the fabric library for drawing lines and shapes. Most occurences where *fabricjs* is imported is in *src/Components/FabricComponents* folder, in the file *__FabricContainer.js__* and *__Rectangle.js__*, *__Polygon.js__* and *__Ellipse.js__*. The fabric container holds the canvas and methods such as canvas event listeners for manipulating shapes, and buttons for zooming, removing and moving between images. To learn more about *Fabricjs* go to: [Fabricjs](http://fabricjs.com/docs).
The shape component files are very small in content size and uses little extra code apart from basic react component structure and the built-in shapes in Fabricjs.
The components in the *src/Components/FabricComponents* folder is imported at *src/Components/Containers/WrapperComponent.js*.

*__Actions and Reducers:__* The *Actions* and *Reducers* is a part of *Redux*, actions are payloads with data and instructions deciding which change to implement in a global *store* object. The Redux store is used as a immutable global state to put frequently used data and keep it easily accessible through binding the necessary properties to the component that needs it. This is always done at the bottom of the component in this project, to see what global properties used in a component scroll down in a component file. To learn more about *Actions* and *Redux* go to: [Actions](https://redux.js.org/basics/actions).

A *Reducers* is the part that takes the payload in the action and execute the desired changes to the global state based on which action was dispatched to the *store*. *Reducers* are baked into the store and consists of defined instructions, or commands, and a recipe for executing a change based on the instruction mentioned in the *action*. When a *Reducer* executes changes it takes the previous state and returns a new *global state*, and all components dependent on a changed property in the state will refresh. To learn more about *Reducers* and *Redux* go to: [Reducers](https://redux.js.org/basics/reducers).

# Other components (src/Components/Containers/...)


Nodejs: [Nodejs](https://www.nodejs.com)

*italic*

*__bold italic__*

__bold__

```
npm install
```

```
npm start
```

```
npm run deploy
```
