
# RecipesWorld

Web App build with ReactJs and a Firebase Backend as Service to share and search recipes from all around the world.

Hosted url: https://recipes-world-1234-training.web.app/discover

- - - -

# Development Guide:

**npm start** => start react localhost server (it listens for changes and automatically reloads).

**firebase emulators:start** => start all firebase emulators enabled on the .firebaserc file.

**firebase emulators:start --only firestore** => start only one specific firebase emulator.

- - - -

# Production Guide:

**yarn build** => bundle files into /build folder.

**firebase deploy** => deploy all firebase tools available (firestore, firestore rules, hosting, auth, functions).

**firebase deploy --only hosting** => only host app to production.

