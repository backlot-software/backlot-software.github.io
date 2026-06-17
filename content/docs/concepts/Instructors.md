+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Instructors"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Instructors

In Backlot, instructors play a crucial role in ensuring that actors can properly assume their designated roles.
Sometimes, an actor may not be immediately ready to take on a role due to specific requirements or configurations needed by the role.
This is where instructors come in.

## What is an Instructor?

An instructor is essentially a function that refines and prepares a role for an actor.
It takes both the role object and the actor as parameters and returns the role after making any necessary adjustments.
This process ensures that the role is tailored to the actor's specific attributes, allowing the actor to perform it effectively.

## How Instructors Work

When an actor is assigned a role, the instructor can be used to modify or enhance the role based on the actor’s characteristics.
For instance, if a role requires certain properties to be filled in, the instructor can ensure these properties are correctly populated using data from the actor.

## Example: AliasInitializer

A common example of an instructor is the **AliasInitializer**.
This instructor helps manage aliases in a role’s properties.
If a role has properties that use aliases, the AliasInitializer ensures that the actor’s data is correctly mapped to these aliases.

```C#
public static T AliasInitializer<T>(T role, object origin)
    where T : IRole
    {
        if (role is IProxiedRole proxy) {
            proxy.Referrers = () =>
            {
                // Does stuff to return the aliases in the actor
            }
        }
    }
```

For example, if a role has a property with an alias, the AliasInitializer matches this alias with the corresponding information from the actor, ensuring the role is ready for use.

### Assigning Instructors in the Director

```C#
AssignInstructorFor<IFormula>(Instructors.AliasInitializer);
```

In this line, the `AliasInitializer` is assigned to roles of type `IFormula`, helping these roles correctly handle aliases based on the actor’s attributes.

## The Importance of Instructors

Instructors are vital because they provide a flexible way to ensure roles are fully prepared for actors.
Without instructors, roles might lack the necessary configurations or data, leading to errors or incomplete functionality.
By using instructors, developers can fine-tune roles dynamically, ensuring smooth and accurate performance in various scenarios.

## Summary

Instructors in Backlot are essential tools that ensure roles are correctly prepared and tailored to the actors who will perform them.
They provide a dynamic way to customize roles, making the framework more flexible and powerful.