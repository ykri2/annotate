# README


## About

This project is a React application that can be run as a web app locally by downloading the project and running it through npm, or it can be hosted. It is a pure frontend and no web api attached, which means there is no way to save the data while running it. If you __refresh__ the page the uploaded images and annotation data will be deleted. It is a basic React/Redux web app, with Webpack as an organizer to include needed loaders to help deal with different files and bundle the javascript files into one.

The app allows users to upload images by drag and drop, flip through the images by using canvas, add terms to autocomplete inputs, marking areas on the images and select what is in that area, and export JSON or CSV files for annotation objects corresponding to images and images file data loaded into the applications local memory.


## Download and install

First download and install the latest stable version of [Nodejs](https://nodejs.org/en/) on your computer. Node is the only thing other than the project folder that is needed. When installing Node make sure to add npm to *PATH*. After Node is installed open the command prompt of your choice and navigate to where the project folder is located. When inside the folder run the command 

```
npm install
```

if Node is installed correctly npm should start to download the necessary dependencies to run the application.



## Run application


To run the application all dependencies must be installed, when that is done run the command   

```
npm start
```

and wait while the application launch in the browser at *localhost:8080*. The __‘’Start’’__ command runs the application through webpack in development mode, go to __*package.js*__ and __*webpack.config.js*__ to see more about commands to produce build bundle, deploy to Github, or specifications on launching the app and the required loaders.
 
The browser will most likely launch by itself when the app is ready to start, if not, open it and go to *localhost:8080* when it says it is ready in the command prompt.



## Tweak the application


*__Main structure of the application:__* The application is a basic react+redux+webpack project, the webpack is minimal in size and can be found at the top of the project folder, alongside the *package.js*, *.babelrc*, and *index.html*. The content of the src folder has three main sub folders to consider, the *Action folder*, *Reducer folder*, and *Components folder*. To better understand the basic structure of the app checkout more on React/Redux and Webpack. The CSS in the project is done in SCSS and loaders for those files are imported in the webpack file, the CSS is messy but just follow the nested structure.


The react router is used to navigate between pages in the application more than frequently, as a quick and dirty way to add new pages. The routes can be found at *src/Components/Root.js*, the provider links the Redux store object to the react application, and the *AppComponent* from *App.js* is imported and wrapped around all routes.


The *App.js* file is found at *src/Components/App.js* and is used as a container for holding components that are always on display, e.i, header, navigation menu, footer. The App component is wrapped around the routes making all components rendered throught specific routes appear alongside static content in *App.js* as child components.
 
 
*__Fabricjs:__* Fabric is used for operating canvas, adding the image as the background element, and adding shapes through built in classes in the fabric library for drawing lines and shapes. Most occurences where *fabricjs* is imported is in *src/Components/FabricComponents* folder, in the file *__FabricContainer.js__* and *__Rectangle.js__*, *__Polygon.js__* and *__Ellipse.js__*. The fabric container holds the canvas and methods such as canvas event listeners for manipulating shapes, and buttons for zooming, removing and moving between images. To learn more about *Fabricjs* go to: [Fabricjs](http://fabricjs.com/docs).

The shape component files are very small in content size and uses little extra code apart from basic react component structure and the built-in shapes in Fabricjs.

The components in the *src/Components/FabricComponents* folder is imported at *src/Components/Containers/WrapperComponent.js*.


*__Actions and Reducers:__* The *Actions* and *Reducers* are a part of *Redux*, actions are payloads with data and instructions deciding which change to implement in a global *store* object. The Redux store is used as a immutable global state to put frequently used data and keep it easily accessible through binding the necessary properties to the component that needs it. This is always done at the bottom of the component in this project, to see what global properties used in a component scroll down in a component file. To learn more about *Actions* and *Redux* go to: [Actions](https://redux.js.org/basics/actions).


A *Reducers* is the part that takes the payload in the action and execute the desired changes to the global state based on which action was dispatched to the *store*. *Reducers* are baked into the store and consists of defined instructions, or commands, and a recipe for executing a change based on the instruction in the *action*. When a *Reducer* executes changes it takes the previous state and returns a new *global state*, and all components dependent on a changed property in the state will refresh. To learn more about *Reducers* and *Redux* go to: [Reducers](https://redux.js.org/basics/reducers).


_To find all action methods used look at the files in the a **Actions folder** at *src/Actions/...*, to find all the properties stored in the global state, go to the **index.js** file in the **Reducers folder** at *src/Reducers/...* ._



## Other components in src/Components/Containers/..:


*__Popup component (src/Components/Containers/PopupComponent):__*
The *popup component* is rendered when the canvas or active shapes on the canvas is *double clicked*, and display different inputs, autocomplete text input, select type input with alternatives, and regular text input. Filename, input for description, and autocomplete is showed when selecting the canvas, on selecting active objects autocomplete inputs and select inputs are displayed for storing what is marked. The popup gives the opportunity to save the details and coordinates for the marked area and save to the Redux *store*. The inputs are found in seperate files as importable components in the folder at *src/Components/HelperComponents/...*
 
 
*__Upload image (src/Components/Containers/UWrapperComponent/):__*
The *upload image component wrapper* renders a component that import one component for uploading images with a dropzone and a list of selected files, and a button to upload after having dropped files, and a second component displayed below for showing uploaded images. The *upload image component* files are in the same folder. The image files are loaded into redux store through the imported action __sendFilesToStore__ from *src/Actions/sendFilesToStore.js*.


*__Upload concept (src/Components/Containers/CWrapperComponent/):__*
The component for *uploading concepts and types* that end up as options in the autocomplete inputs to note down what is in a marked area has two child components, each with their own dropzone for the different files, __ConceptComponent.js__ and __TypeConceptComponent.js__. Each component imports the actions from *src/Actions/...* for sending the content read from the selected files to the redux *store*, the files must be JSON and consists of an object with an array, example files can be found at *src/Components/resources/..*  as __types.json__ and __concepts.json__.


*__Export file (src/Components/Containers/ExportComponent/):__*
The components for *exporting list of annotations* with id for each image and a *list of objects with image name and corresponding id*. The annotation objects also has the name of the file in the object, a json file with an example of an exported object can be found at *src/Components/resources/...* .   __ExportComponent.js__ binds the image file and annotation data in Redux *store* to component properties at the bottom of the file in the *mapStateToProps* function. The files are exported by downloading them as either JSON or CSV files, the functions to attach them as a download in the browser is in the component below the rendered HTML.
 
 
*__Overview file (src/Components/Containers/OverviewComponent/):__*
The *overview component* displays different cards with information, more or less a summary of all different information stored in the Redux *store*, and a card with a way to navigate between images by providing an *index*. By clicking the button next to the input field the current index stored in the Redux *store* is updated, the *action* to update is imported from the *actions folder*, the global state properties such as the *current index* can be found by checking the *Actions* and *Reducers* sections above.


## Example files:


In the folder at src/Components/resources/ example files are available for concept, types and for showcasing the output from exporting the json file of annotations through the Export page in the application. Files are: concepts.js, types.js, and annotations.js.


## Deploy to Github:


```
npm run deploy
```


## Authors

Yngve - *Institutt for informasjons- og medievitenskap*


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to fabricjs for easy to adopt canvas
* The people on StackOverflow for solving all my problems
* A bunch of others people and their code

