# Project: Recipe Sharing Application  

## Overview  
Welcome to **Recipe Sharing Application**, an Angular-based web application for sharing and exploring mouthwatering recipes. This application empowers users to create, view, edit, and delete recipes effortlessly. With a sleek user interface and robust features, it provides a delightful culinary experience.  

## Core Features  

### Recipe Showcase  
- Home page displaying a curated list of recipes with images and descriptions.  
- Detailed recipe view offering complete information, including ingredients and cooking instructions.  

### Recipe Submission  
- A form allowing users to add new recipes, including fields for the title, description, ingredients, instructions, and an option to upload an image.  
- Utilizes Angular **Reactive Forms** for form handling and validation.  

### Recipe Management  
- Users can edit or delete their recipes after posting.  

### Search Functionality  
- A dynamic search bar enabling users to find recipes by title or ingredients.  

### Smooth Navigation  
- **Angular Router** ensures seamless navigation between the home page, recipe details, and the recipe submission form.  

## Technical Details  

### Component Architecture  
- Modular components designed for clear separation of concerns.  
- Uses Angular **Input and Output decorators** for effective data flow.  

### Service Layer  
- A dedicated **Recipe Service** manages operations like fetching, adding, updating, and deleting recipes.  
- Acts as a bridge between the user interface and the mock backend.  

### Mock Backend  
- Uses **json-server** to simulate a backend with a database file located at:  src/assets/data/db.json


### Validation and Error Handling  
- Form validation ensures that users provide correct input before submission.  
- Displays appropriate error messages for a better user experience.  

### Responsive Design  
- Ensures an optimal viewing experience on different devices, from desktops to smartphones.  

## Setup and Running the Application  

1.Clone the repository to your local machine.
2.Navigate to the project directory- cd Project-Recipe-App-Test
3.Install dependencies using npm install - npm install
4.Start the mock backend using json-server npx json-server --watch src/assets/data/db.json
5.Launch the Angular application using ng serve.
6.Access the application in your web browser at http://localhost:4200.

Challenges Encountered
Implementing data persistence with json-server.
Managing proper state updates when users edit or delete recipes.

Contributors
Mariam Zhizhilashvili
