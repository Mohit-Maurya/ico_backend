### Generic Comments
- MVC is followed :heavy_check_mark:
- code is modular and different modules and functions server their invididual purposes :heavy_check_mark:
- move constants to a separate file
- db connections: move to separate 'database' module
- routes can be better organized; also do not use http verbs like "get", "post" in routes: https://restfulapi.net/resource-naming/
- could've used express Router to better organise routes
- logging is added, more log statements could've been added: everytime an error occurs, or query database
- response objects could've been standardized
  - for e.g. all success responses can follow a specific format
  - and all error responses can follow another specific format
- filenames should have underscores instead of dots in their names: e.g. coins_models.js
- unused code should be removed

### File Specific comments
- coins.models.js: 'status' declared twice (would be caught at compile-time in typescript)
- investors.controllers.js: 'logger' is not defined (would be caught at compile-time in typescript)
- coins.controller.js: prefer using === in JS over ==
- icoAllocation.engine.js: 
  - == >> ===
  - console.log used instead of logger
  - This is a blocking call: processing should be happening asynchronously, http response could've been returned right away
  - This code could've been modularized better and actual bidding algorithms could've been plugged in using "[strategy design pattern](https://en.wikipedia.org/wiki/Strategy_pattern)". This pattern helps implement the [open-closed design principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle#:~:text=In%20object%2Doriented%20programming%2C%20the,without%20modifying%20its%20source%20code)