The main purpose of this application is connecting pet lovers and helping them to find what they are looking for.

FEATURES:
  - user registration neccessary for adding, updating and deleting their ads for:
    1. different types of pets (dog, cat, rabbit, fish, parrot, hamster)
    2. different puprose (foor sale, look for, found, lost, seen)
    3. different states and cities
  - searching and filtering ads by criteriums mentioned above allowing users to find appropriate ad providing them   with neccessary information to contact ad owner
  - adding, updating and deleting user subscription(s) to be informed when appropriate ad is added (emailing service isn't implemented yet)
  - notifications about actions outcome and wrong entered data

TECHNOLOGY AND ARHITECTURE:
  - MERN technology stack
  - client side uses React, ReactRouter, Redux
  - react production bundle is served as static content from Express server
  - same express server implements JSON API-s for client providing it with data from MongoDB (MVC arhitecture is implemented)
  - few external APIs are called directly from client code
  - authentication is implemented using jwt (jwt is sent through cookie)

SECURITY NOTES:
  - strong (hashed) passwords
  - express use helmet
  - validations using @hapi/joi
  - access control for resources manipulation
  - cookie and jwt not properly configured yet
  - security logging not implemented yet
 
