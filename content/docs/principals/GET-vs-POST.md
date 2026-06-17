+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Get Vs Post"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


Backlot provides two primary HTTP endpoint methods, GET and POST, for interacting with roles.
These endpoint methods allow you to either use new role data or execute scenarios using already persisted roles.
Understanding the distinct functions of these endpoints is key to using them correctly.

## POST

Used to create or update roles and execute a scenario based on the newly provided data.
The request's body contains all the necessary information to execute the scenario.
Previously persisted data gets merged after scenario execution.

### Example POST Request

```http
POST http://{{host}}/api/role/person/processperson/
Content-Type: application/json; charset=UTF-8

{
  "Uid": 123,
  "Name": "Klaas",
  "Address": "Amsterdam",
  "Extra Field": "This extra field is saved, but not used by the role itself. However, it is not lost during scenario execution."
}
```

### Purpose POST

The POST request initiates a scenario using the data provided in the body.
If the role is persistable, it gets updated after the scenario is executed.

### Requirements POST

- **Required Body**: The request must have a body.
- **Required Body Data**: The request body must contain all the necessary role data.  
- **No Query String Allowed**: There must be no query string in the URL.

## GET

Used to execute scenarios using roles that have already been persisted.
While the GET request itself does not directly alter or persist any new data, it may trigger scenarios that result in data changes.

### Example GET Request

```http
GET http://{{host}}/api/role/person/processperson/?uid=123
Content-Type: application/json; charset=UTF-8
```

### Purpose GET

The GET request executes the specified scenario for the role associated with the given `Uid` in the query string.
The GET request itself does not directly change or save any data.
However, depending on the logic of the scenario being executed, the state of the role or related roles may be updated.

### Requirements GET

- **No Body Allowed**: The GET request should not contain a body.
- **Required Query String**: The `uid` parameter is required in the query string.


## Conclusion

The POST and GET endpoint methods serve different purposes:

- **POST**: Used for processing and updating roles while executing scenarios with new or updated data.
- **GET**: Used for executing scenarios using existing, persisted roles.
While GET requests typically do not alter or persist data, the scenarios they execute may lead to updates in the data.