---
title: Director configuration
---

In the Backlot framework, the `Director` class is a central component responsible for orchestrating the behavior of various components and scenarios within an application.
This chapter explains the `Director` class, its configuration and its usage.

## Overview

A `Director` inherits from `AutofacContainerDirector<TRelationRepository, TPersistedRoleRepository, TUnitOfWork, TUserContext, TCacheFactory>` (namespace `Backlot.DependencyInjection.Autofac`).
The type arguments select the [repositories](../principals/relation-repository.md), the [unit of work](../principals/unit-of-work.md), the user context and the cache factory used by the application.

The director is tasked with:

1. Assigning [instructors](../concepts/instructors.md).
2. Preparing [scenarios](../concepts/scenarios.md) for execution.
3. Defining [watchers](../concepts/watching.md) to monitor events and trigger actions.
4. Registering additional services in the container (by overriding `Registration`).

The `Incept` method is the place where instructors, scenario compositions and watchers are configured.

## Detailed Explanation

### 1. Assigning Instructors

Instructors are used to initialize specific types with necessary configurations and behaviors.

- **Permissions Initialization**:
  Assigns default read-write execute permissions to `IPermission` roles using `Backlot.Core.Security.PermissionInitialization.AllAccessInitialization`.

  ```csharp
  AssignInstructorFor<IPermission>(PermissionInitialization.AllAccessInitialization, 999);
  ```

- **Persisted roles**:
  Prefer the encrypted permissions sent by the client before falling back to the database.

  ```csharp
  AssignInstructorFor<IPersist>(PermissionInitialization.EncryptedPermissionInitialization, 997);
  AssignInstructorFor<IPersist>(PermissionInitialization.DbAccessInitialization, 998);
  ```

- **Type-Specific Instructors**:
  Initializes other types with their respective initializers, for example the alias initializer from `Backlot.Defaults.Instructing`.

  ```csharp
  AssignInstructorFor<IMoney>(MoneyInitialization.Initialize);
  AssignInstructorFor<ILineItem>(LineItemInitialization.Initialize);
  AssignInstructorFor<IFormula>(Instructors.AliasInitializer);
  AssignInstructorFor<IPerson>(Instructors.AliasInitializer);
  ```

### 2. Preparing Scenarios

Scenarios are compositions of behaviors and actions that can be executed.
By creating your own compositions and configuring them in the director, you can alter the behavior of these scenarios.

- **WhoAmI Scenario** (from `Backlot.Defaults.Scenarios.Authentication`):
  Defines how the information of the current user is retrieved.

  ```csharp
  PrepareCompositionFor<WhoAmI>(scenario =>
  {
      scenario.GetInfo = async () =>
      {
          var ur = ServiceLocator.Get<IUserRepository>();
          var user = await ur.TryGetUser(UserContext.Current.UserName);
          return user.success ? JObject.Parse(user.settings) : JObject.Parse(string.Empty);
      };
  });
  ```

### 3. Defining Watchers

Watchers monitor specific events within scenarios and trigger actions, such as calling a webhook or logging information.

- **Debug Watcher**:
  `DebugWatcher` (namespace `Backlot.Http.Watching`) monitors events and posts them to a configurable webhook endpoint.

  ```csharp
  WatchAll<DebugWatcher>(d =>
  {
      d.Events = "Ending";
  });
  ```

- **Watcher per scenario**:
  Attach a watcher to one specific scenario.

  ```csharp
  Watch<Calculate, FollowUpScenarioWatcher<Calculate, FollowUp>>();
  ```

### 4. Registration and secret

Override `Registration` to register extra services, and implement the abstract `SecretKey` property, which is used for token and encryption calculations.

```csharp
public override void Registration()
{
    base.Registration();

    Builder.RegisterType<UserFileRepository>()
        .As<IUserRepository>()
        .SingleInstance();
}

protected override string SecretKey => "<your secret>";
```

## Director Example

Here's a streamlined `Director` class that focuses on the core functionalities:

```csharp
using Autofac;
using Backlot.Core;
using Backlot.Core.Security;
using Backlot.Core.Services;
using Backlot.DependencyInjection.Autofac;
using Backlot.Http.Watching;
using Backlot.Services.LiteDB;

namespace Backlot.Demo.Web;

public class Director(IFileSystem fileSystem, IConfigurationManager configurationManager, ContainerBuilder builder)
    : AutofacContainerDirector<
        LiteRelationRepository,
        LitePersistedRoleRepository,
        DummyUnitOfWork,
        BasicUserContext,
        CacheFactory>(fileSystem, configurationManager, builder)
{
    protected override string SecretKey => "<your secret>";

    public override void Incept()
    {
        // 1) -- Backlot instructors
        AssignInstructorFor<IPermission>(PermissionInitialization.AllAccessInitialization);

        // 2) -- Backlot prepare scenarios for playing

        // 3) -- Backlot define watchers for all or per scenario.
        WatchAll<DebugWatcher>();
    }
}
```

## Summary

The `Director` class in Backlot is essential for managing permissions, initializing types, preparing scenarios, and defining watchers.
By configuring these components, the `Director` ensures that the application runs smoothly and that specific actions are triggered based on defined events.
