# Completed by Andriy Diduh 
.
## Completion status: 100%
[Click here, to launch the APP.](https://andriy-diduh-frontier-react-exercise.netlify.app/)

.

hi, my name is Andriy  <br />
and I'm a software engineer, <br />
let's see what can be built here! 

Feel free to visit my [Portfolio website ](https://andriydiduh.com).

I hope you will launch this demo to see it in action, and I hope that you will Fork and not just copy ;) 

.

The code, types, and styles are written completely from scratch.

### Added packages: 
- "enzyme" + "enzyme adapter" to help with testing on Jest,
- multiselect component,
- node sass for importing .scss.

### Added features and completed requirements:
- field validation with patterns and messaged,
- next and submit after all required fields are filled correct,
- on submit, displays alert ('Results were logged to the console!') and outputs the saved fields data to the console,
- added 2 tests with Jest
- added one react hook for the copyright at the bottom right
- strongly typed code, the "any" type used at bare minimum (use search in a code editor for ": any") usually to point Empty props for components or as a wildcard where it makes sense
- by default ES6 syntax is used.
- styling is done from scratch in an .scss file with the imported Google Roboto Font.

.

.

## A few questions to the "Frontier React Exercise" description.

- 1 - Where to use the colors from the form_instructions.json > "theme"?

- 2 - What does the "originStep" in the "multichoice" field type in form_instructions.json do?

- 3 - Not provided visual screens of other sections, to see what design to implement.

- 4 - Not provided the names of the used fonts in the mockup.

- 5 - Url and Ulr Skype type fields are missing the "pattern" in form_instructions.json for the correct validation (that should be supplied from the back-end). This leads to not fully correct work of the APP in the "optional" section, please fix "on the backend" (in the .json file).

.

.

# Frontier React Exercise

At Frontier, we aim to help our customers find and hire more candidates by improving their hiring funnel. One large part of this funnel is our highly optimized job application forms, which we generate for each customer based on their requirements and their existing application form.

![An example of a Frontier application form](https://frontier-public-assets.s3-us-west-2.amazonaws.com/frontier-form-demo.png)

When we generate our application forms, the first step involves capturing the customer's original form and generating a detailed schematic to describe the form to our React form generator on the frontend. For this exercise we'd like you to build a simple form generator based on some provided data.

## About the exercise
The JSON array in `./src/data/form_instructions.json` is an example of the instructions used by our React app to generate application forms on the fly for our customers. 

For this short exercise, please use the basic React setup provided in this repo, along with the provided instruction JSON, to generate a functional application form UI. We want you to solve the problem in a way that makes sense to you, but we ask that you consider the following constraints:

- Please use Typescript to the best of your ability.
- Please try to make use of ES6 and React hooks.
- In your finished implementation, the "Submit" button should log the user entered values to the console.
- Style the UI yourself by any means you feel comfortable (ie. styled-components, SCSS, LESS, vanilla CSS). Try to avoid using third party UI libraries like material-ui and bootstrap. We're primarily looking for consistency in styling, so you don't need to spend a lot of time making everything look perfect.
- Try to structure your code so it can be unit tested. Bonus points if you also write a unit test for one of your components.

### Getting started

- 1. Checkout this repo and run `npm install` to install dependencies.
- 2. Open `src/components/App.tsx` where you'll find the instruction JSON you'll need to build the form.
- 3. Run `npm start` to launch the dev server.

When you send your solution back to us, please include your thoughts on the exercise and how long you spent on it so we can adjust our expectations.

Good luck!

– Frontier Engineering :)
