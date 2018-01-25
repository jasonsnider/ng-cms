# Build a CMS

In Angular build a basic CRUD application for managing users via the users API provided by the *mean.example.com* project. Name this project *ng-cms*.

Before just diving into code stop and think about what you already know about the application you are about to build, this will help you find a starting point.

## What do I know?

* I know I'm working with an API.
  * This tells me I will need to work with the HttpClient and with HttpHeaders
* I know I'm working with *http://localhost:3000/api/users*
  * This tells me I will need to define this URL someplace.
* I know I'm working with data
  * This tells me I will need a model (a service and a schema)
  * This tells me I will probably be working observables or promises
* I know the data I'm working with involves users (as the API is users)
  * This tells me I should create
    * a users component
    * a user schema
    * a user service


First things first, let's use the AngularCLI to create our project. Create then cd into the project.

```sh
ng new ng-cms
cd ng-cms
ng serve --open
```

At this point we will have a browser window running the default Angular application.

[Next: Getting Started](./02-GettingStarted.md)
