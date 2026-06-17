+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Logging and Exception Handling"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


# Logging and Exception Handling

We make use of structured logging. Below is an overview of the logging practices and guidelines used in this context.

## Context Information

Every log entry includes the following context information:
- ctxPath: the endpoint path. 
- ctxRequestid: a unique number created at request within Backlot. Alle items logged during this request do have this unique id. 
- ctxSessionid: The id set by the client to group all logs during a site visit.
The client can send this by using the header "x-session-id" within the request. When not used "none" is displayed. 
- ctxUsername: an anonymized string representation of the current user. "anonymous" when no one is logged in.

## Scenario-Specific Logging

For scenarios, additional context is logged:
- Role: A friendly reference to the role (only the first 6 chars of an id are saved, because of privacy reasons).
- Reference: The scenario reference (based on ScenarioReference object). 


## Backlot-Specific Information

- ChpServerId: The unique 8 chars Backlot server id. Especially useful when using shared log destinations. 
- ChpEnvironment: the Backlot.Environment configured. 
- ChpExceptionMode: The exception mode configured. 


## Logging Guidelines

- LogError: Use LogError only when an exception occurs and is handled (i.e., not re-thrown).
- LogWarning: Use LogWarning for exceptions related to unauthenticated user states.
- LogInformation: Use LogInformation for exceptions that are not handled at the moment. For instance:
  - When throwing a custom exception with throw new CustomException(); 
  - When re-throwing an exception with catch (Exception ex) { throw; } 
  - Ensure that all information logs follow this format:
  ```'Something {exc_type}' occurred '{exc_message}' within '{clss}.{fn}'.```
- Exception Logging: When logging exceptions, always include exc_type (exception type) and exc_message (exception message) in the log template. For example:
```"An unexpected '{exc_type}' occurred '{exc_message}'", ex.GetType().FullName, ex.Message```
- Sensitive Information: Logs, warnings, and information entries must not contain user-sensitive information.
- LogDebug: Use LogDebug for logging details that are useful for fixing exceptions.
These can include sensitive information, but they must make the reader aware of the fact they need to be removed as soon as possible.
- Log Cleanliness:
  - Keep logs clean and concise.
  - Only log information that is or can be helpful.
  - Avoid redundant logging.

## Message Template Conventions
When logging use the following conventions for message templates:

- mexcType: The full name of the exception type. 
- excMessage: The exception message. 
- clss: The current class name (use this.GetType().FullName or nameof(specifiedclass)). 
- fn: The name of the function where the error occurs (use nameof(thefunction)). 
- event: The event name, in the case of an event.

## Example Log Messages

```C#
_logger.LogWarning("Persistable {Role} with {Uid} could not be persisted, within '{Clss}.{Fn}'",
role.GetFriendlyReference(),
role.Uid,
nameof(ScenarioBuilder),
nameof(ExecPersistAndRelate));
```

```C#
_logger.LogError(ex, "An unexpected '{ExcType}' occurred '{ExcMessage}', within {Cls}.{Fn}",
ex.GetType().FullName,
ex.Message,
nameof(RoleApi),
nameof(Play));
```