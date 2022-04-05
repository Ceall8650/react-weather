# react-weather

Practice writing a weather card with React.js and tailwind CSS

## :warning: Attention!!!
Before running project, you should need to apply a `authentication token` from `https://opendata.cwb.gov.tw/` to fetch weather data
 
## Features

* Display current moment according the sunrise and sunset in that day
* Display current time
* Display current weather (wet, wind, temperature, description)
* Change theme based on moment
* Change weather icon according weather

## Learning checklist
- Functional components
- React hooks
  - [x] useState
  - [x] useEffect
  - [x] useCallback
  - [x] useMemo
- Custom hooks
- Tailwind CSS + Module css
- Light/Dark mode
- PWA supported

TODO list:
- [ ] Alias of import path
- [ ] css -> scss
- [ ] enums
- [ ] Detect user's location through user's browser
- [ ] Redux

## Data resource

### Sunrise/Sunset timestamp
Data source: https://opendata.cwb.gov.tw/dataset/astronomy?page=1

Check out the file `utils/sunrise-sunset.json` to see sunrise/sunset timestamps during 2020-2022

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

