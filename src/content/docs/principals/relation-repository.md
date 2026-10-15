---
title: Relation Repository
---

The Relation Repository is responsible for storing and retrieving relationships between roles.
A relation refers to a connection between two roles.
A relation is established as soon as two `IPersist` roles play a role in the same scenario.
Combinations are unique, meaning `roleid1=xyz` and `roleid2=abc` is equivalent to `roleid1=abc` and `roleid2=xyz`.

## Types of Persisted Role Repositories

Similar to the [Persisted Role Repository](./persisted-role-repository.md), there are two standard implementations for the Relation Repository in Backlot: the Memory Relation Repository and the RavenDB Relation Repository.

### Memory Repository

The Memory Relation Repository stores relations in-memory, which means the data is volatile and lost upon application shutdown or restart.
This is ideal for rapid development cycles, testing scenarios, or situations where relation data persistence beyond application sessions is unnecessary.

Use the following director in your project to configure the Memory Relation Repository:

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

The RavenDB Relation Repository stores relations in RavenDB, a high-performance, distributed, NoSQL document database.
In addition to its NoSQL capabilities, RavenDB is also an ACID-compliant database, which is unlike many other NoSQL databases.
This provides durable storage for relations across application sessions and is suited for production environments requiring robust, scalable, and durable storage solutions for relation data.

Use the following director in your project to configure the RavenDB Relation Repository:

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
