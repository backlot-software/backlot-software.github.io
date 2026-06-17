+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Actor"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


In this section of the documentation, we explain what an actor is and what it does within a Backlot application.

## What is an Actor?

An actor is an object, person, or entity that plays a role in a scenario within Backlot.
Actors can be supplied from other systems and are essentially objects with data that need to be processed in a specific way.

## Assigning Roles to Actors

To handle actors in a generic manner, Backlot assigns a predefined role to incoming actors.
This role assignment is carried out by instructors, who for example specify how fields of actors should be proxied to a role.
Consequently, different actors with different names for certain fields can play the same role and participate in the same scenarios.

## Data Preservation

It is crucial that during the role assignment process, an actor does not lose any data that is not pertinent to the role it is playing.
The actor retains its original attributes and can be reassigned to other roles in different scenarios.

## Metaphor for Actor/Role Principle

Consider this metaphor to better understand the actor/role principle:

- Tom Cruise is an actor who learns the role of a fighter pilot.
- He performs a flight scene in the role of a fighter pilot.
- Other actors who also acquire the skills for the role of a fighter pilot can be instructed and perform the flight scene as well.
- Meanwhile, Tom Cruise, the actor, retains his original attributes and can play different roles, such as a secret agent, in another movie.


## Example

Here is a practical example to illustrate the concept:

### Scenario: ProcessPerson

#### 1. Actor Representation

An incoming employee record might look like this in JSON:

```json
{
  "employeeId": "12345",
  "fullName": "Jane Doe",
  "dateOfBirth": "1985-05-15",
  "position": "Software Engineer",
  "department": "Development"
}
```

#### 2. Role Assignment

The employee record (actor) is assigned a "Person" role. The role might be represented as follows:

```json
{
   "Uid": "12345", 
   "Name": "Jane Doe", 
   "BirthDate": "1985-05-15"
}
```

#### 3. Scenario: ProcessPerson

The system processes the person data for various tasks, such as updating records or generating reports, using the proxied fields.

#### 4. Data Preservation

When the actor is stored or returned after executing the scenario, it will look like this:

```json
{
   "Uid": "12345", 
   "Name": "Jane Doe", 
   "BirthDate": "1985-05-15",
   "position": "Software Engineer",
   "department": "Development"
}
```

The attributes like "position" and "department" remain intact and can be used if the actor needs to be reassigned to another role, such as a "TeamMember" in a "StartProject" scenario.

## Summary

An actor in Backlot is data that arrives and can be assigned a role with the help of instructors.
In this role, the actor can participate in a scenario, but it retains its original attributes.
This flexible approach ensures that the same data can be reused across different contexts without losing its integrity.