+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Relation Repository"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


The Relation Repository is responsible for storing and retrieving relationships between roles.
A relation refers to a connection between two roles.
A relation is established as soon as two `IPersist` roles play a role in the same scenario.
Combinations are unique, meaning `roleid1=xyz` and `roleid2=abc` is equivalent to `roleid1=abc` and `roleid2=xyz`.

## Types of Persisted Role Repositories

Similar to the [Persisted Role Repository][1], there are two standard implementations for the Relation Repository in Backlot: the Memory Relation Repository and the RavenDB Relation Repository.

### Memory Repository

The Memory Relation Repository stores relations in-memory, which means the data is volatile and lost upon application shutdown or restart.
This is ideal for rapid development cycles, testing scenarios, or situations where relation data persistence beyond application sessions is unnecessary.

Use the following code in the `Program.cs` to configure the Memory Relation Repository:

```C#
.ChaplinAppConfiguration<MemoryRelationRepository, MemoryPersistedRoleRepository, DummyUnitOfWork>()
```

### RavenDB Repository

The RavenDB Relation Repository stores relations in RavenDB, a high-performance, distributed, NoSQL document database.
In addition to its NoSQL capabilities, RavenDB is also an ACID-compliant database, which is unlike many other NoSQL databases.
This provides durable storage for relations across application sessions and is suited for production environments requiring robust, scalable, and durable storage solutions for relation data.

Use the following code in the `Program.cs` to configure the RavenDB Relation Repository:

```C#
.ChaplinAppConfiguration<RavenRelationRepository, RavenPersistedRoleRepository, RavenUnitOfWork>()
```

[1]: Persisted-Role-Repository.md