+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Unit Of Work"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Unit of Work

The Unit of Work pattern is a central concept in ensuring that data manipulation operations are coordinated and handled as a single transaction.
This is especially critical in systems where multiple related operations must succeed or fail together, maintaining data integrity and consistency.
In Backlot, the `IUnitOfWork` interface defines the contract for implementing the Unit of Work pattern.

## RavenUnitOfWork

The `RavenUnitOfWork` class is an implementation of the `IUnitOfWork` interface specifically designed for use with RavenDB.
It manages a session with the database and ensures that commands are executed as part of a single transaction.
This class encapsulates the logic required to commit changes to the RavenDB instance and provides a mechanism for disposing of resources.

### Key Components

- **AsyncSession**: Manages the session with the RavenDB instance, allowing for asynchronous operations.
- **Commands**: A dictionary that stores the commands to be executed as part of the unit of work.
- **Commit()**: Executes all commands stored in the `Commands` dictionary and then saves the changes to the database.
- **Dispose()**: Cleans up resources, ensuring that the session and command dictionary are properly disposed of.

### Configuration RavenDB

Use the following code in the `Program.cs` to configure the RavenDB repositories with a Raven unit of work:

```C#
.ChaplinAppConfiguration<RavenRelationRepository, RavenPersistedRoleRepository, RavenUnitOfWork>()
```

## Memory Unit of Work

For testing and prototyping purposes, a dummy implementation of the `IUnitOfWork` interface is used.
This implementation does not actually persist changes but is useful for development and testing scenarios.

### Dummy Unit of Work

The `DummyUnitOfWork` class is a no-op implementation of the `IUnitOfWork` interface.
It is used when the implementation does not require or support the unit of work pattern.

### Configuration Memory

Use the following code in the `Program.cs` to configure the memory repositories with a dummy unit of work:

```C#
.ChaplinAppConfiguration<MemoryRelationRepository, MemoryPersistedRoleRepository, DummyUnitOfWork>()
```

This setup allows for rapid development cycles and testing scenarios without the overhead of a persistent data store.