# Worldia test application

# Frontend

The goal of this exercise is to create a little application with :
 * A homepage with a title and a "go" button leading to the trips page
 * A trips page displaying Worldia trips grouped by area.

We will assess the code quality and structure, the dependencies you use, and compliance with instructions given.

### Objectives:
 * Display 2 pages on `/` and `/trips`
 * Send an API call
 * Display the results using components

### Constraints:
 * You can use the frameworks and libs you like
 * No time limit, just tell us how much time you spent
 * We will test it with the latest version of Chrome
 * Wireframe in Test.pdf shows what information should be displayed, feel free to imagine another presentation (we advise to use Bootstrap)

### In-depth:

##### 1) API CALL:
To get the list of trips : `https://www.worldia.com/api/v1/trips/?criteria[state]=template`

Hint: You will have to activate *Same Domain Origin Policy* on your browser:
Firefox: https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/
Chrome: http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

##### 2) TRIPS PAGE:
Display the trips from the API using components:
 * `Trip` will be the component that displays some information about the trip (at least the name and image but you can add details like duration, catch phrase, locations list).
 * `Area` will display the area name and include a list of `Trip`s (trips whose `areas` list contains this area).
 * `Trips` is the page that displays the list of `Area`s

A trip image will be available at : `https://cdn.worldia.com/cache/270x300/{trip.thumbnail.path}`

### Included
 - [ngrx/store](https://github.com/ngrx/store) - RxJS powered state management for Angular apps, inspired by Redux
 - [ngrx/effects](https://github.com/ngrx/effects) - Side effect model for @ngrx/store
 - [angular/router](https://github.com/angular/angular) - Angular Router
 - [ngrx/db](https://github.com/ngrx/db) - RxJS powered IndexedDB for Angular apps
 - [ngrx/store-devtools](https://github.com/ngrx/store-devtools) - Instrumentation for @ngrx/store enabling time-travel debugging
 - [codewareio/ngrx-store-freeze](https://github.com/codewareio/ngrx-store-freeze) - A @ngrx/store meta reducer that prevents state from being mutated
 - [reselect](https://github.com/reactjs/reselect) - Selector library for Redux

### Quick start


```bash
# install node (stable version)
https://nodejs.org/en/

# install angular cli
npm install -g @angular/cli

# clone the repo
git clone https://github.com/szine/worldia_test.git

# change directory to repo
cd worldia_test

# Use npm or yarn to install the dependencies:
npm install

# OR
yarn

# start the server
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser

### Homepage 

- Slider with the 5 first areas
- Search trips by areas

### Trips page

- Trips grouped by area
- Search trips by areas

### Trip detail page

- Add or remove trip from favorite

### Favorites pages

- List all trip added in favorite
- Favorite are stored in indexdb

