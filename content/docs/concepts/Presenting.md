+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Presenting"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Presenting

In this section of the documentation, we explain the Presenting functionality within the Backlot application framework.

## Overview

The Presenting functionality is used to transform actors into specific roles within the Backlot system.
This is achieved using a combination of dynamic proxies and role instructors to ensure that actors can adapt and perform the behaviors defined by their roles.

## Presenting Actors as Roles

### Presenting a Role

In the world of Backlot, presenting an actor as a role is like to transforming an actor into a character on screen.
The `Presents<TRole>` method is responsible for this transformation, carefully proxying the actor's attributes to those required by the role.
Developers can customize this transformation further with personal instructor functions, ensuring each role is finely tuned for its intended purpose.

### Presenting a Role by Type

When the specifics of a role are variable and not predetermined, the `PresentsType` method offers a versatile approach.
This method adapts the actor to a role defined at runtime, maintaining the integrity and adaptability of the role across different contexts within the application.

## Creating Roles with Empty Actors

### Creating a New Role Instance

Similar to preparing an actor for a new character, developers can initiate a new role instance using the `New<TRole>` method.
This method ensures the role is equipped with the necessary attributes, either through a predefined implementation or a fallback to a basic structure provided by `EmptyShellActor`.

### Creating a New Role Instance by Type

For scenarios demanding flexibility at runtime, the `New(Type TRole)` method enables the creation of role instances based on dynamically determined types.
This method adapts the actor to the specifics of the role, maintaining coherence across different application scenarios.

## Transmit

In the spirit of passing on a character's essence to a new role, the `Transmit<TRole, TDestination>(TRole role)` method facilitates the transfer of behaviors and attributes from one role (`TRole`) to another (`TDestination`).
This method enables developers to reuse and extend role behaviors within the application framework, ensuring continuity and efficiency in role-based scenarios.

## Summary

Just as actors bring characters to life on screen, the Presenting functionality in Backlot empowers objects to seamlessly assume different roles within the Backlot application.