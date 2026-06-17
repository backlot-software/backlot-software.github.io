+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Persisted Role Repository"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Persisted Role Repository

In Backlot, the `PersistedRoleRepository` is a critical component responsible for storing roles that implement the `IPersist` interface.
This repository ensures that roles persist across application sessions, facilitating data continuity and retrieval.

## Usage and Integration

### IPersist
All roles that implement the `IPersist` interface/role can be persisted by the `PersistedRoleRepository`.

### Automatic Persistence
Backlot ensures that any role implementing the `IPersist` interface/role is stored persistently using the configured repository.

## Types of Persisted Role Repositories

### Memory Repository

Stores roles in-memory, which means data is volatile and lost upon application shutdown or restart.
Ideal for rapid development cycles, testing scenarios, or situations where role data persistence beyond application sessions is unnecessary.

Use the following code in the `Program.cs`.

```C#
.ChaplinAppConfiguration<MemoryRelationRepository, MemoryPersistedRoleRepository, DummyUnitOfWork>()
```

### RavenDB Repository

Stores roles in RavenDB, a high performance, distributed, NoSQL document database.
In addition RavenDB is also an ACID database, unlike many other NoSQL databases.
Provides durable storage for roles across application sessions.
Suited for production environments requiring robust, scalable, and durable storage solutions for role data.

Use the following code in the `Program.cs`.

```C#
.ChaplinAppConfiguration<RavenRelationRepository, RavenPersistedRoleRepository, RavenUnitOfWork>()
```