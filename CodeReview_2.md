### Pros
* Able to identify and write REST APIs
* Some basic hygiene is followed for eg: validation, password encryption etc.
* Modular code, segregation of responsibility to some extent.
* MVC is followed, each resource has proper mapping to routes, controllers, etc.
* Logging present at appropriate place should help to quickly debug it.
* Database models were good and alright for MVP.
* Usage of Library was prominent to avoid rework and reuse as far as possible Decrypt, Mongo DB  connector.
* Data is presented by service layer in segregated way so that much usable for front end (customer experience).
  
### Cons
* Code to Interface to be followed with SRP
* Could have written some test case (no expecting TDD or Testable code) but always write UT.
* Error Code in response to be proper 404 may not always work, each error code has specific purpose.
* Logging too much should be avoided.
* Extending functionality or features will require rework.
* Security to be taken care in DB design
* DRY, code is duplicate lot of places.
* OOPs could be followed for this project (as it is appropriate).
* Language conventions to be followed for file names, variable names etc.
* Service layer to contain business logic is expected instead of writing business logic in controllers.