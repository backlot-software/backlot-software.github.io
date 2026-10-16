---
title: Persisted Role Repository
---

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

Define the repositories as type arguments of your director.

```csharp
public class Director(IFileSystem fileSystem, IConfigurationManager configurationManager, ContainerBuilder builder)
    : AutofacContainerDirector<
        MemoryRelationRepository,
        MemoryPersistedRoleRepository,
        DummyUnitOfWork,
        BasicUserContext,
        CacheFactory>(fileSystem, configurationManager, builder)
{
    protected override string SecretKey => "<your secret>";
}
```

### RavenDB Repository

Stores roles in RavenDB, a high performance, distributed, NoSQL document database.
In addition RavenDB is also an ACID database, unlike many other NoSQL databases.
Provides durable storage for roles across application sessions.
Suited for production environments requiring robust, scalable, and durable storage solutions for role data.

Define the repositories as type arguments of your director.

```csharp
public class Director(IFileSystem fileSystem, IConfigurationManager configurationManager, ContainerBuilder builder)
    : AutofacContainerDirector<
        RavenRelationRepository,
        RavenPersistedRoleRepository,
        RavenUnitOfWork,
        BasicUserContext,
        CacheFactory>(fileSystem, configurationManager, builder)
{
    protected override string SecretKey => "<your secret>";
}
```
