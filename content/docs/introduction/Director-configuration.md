+++
weight = 200
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Director Configuration"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


In the Backlot framework, the `Director` class is a central component responsible for orchestrating the behavior of various components and scenarios within an application.
This chapter provides an in-depth explanation of the `Director` class, detailing its configuration and usage.

## Overview

The standard `Director` class inherits from `ContainerDirector` and is tasked with:

1. Assigning [instructors](Instructors.md).
2. Preparing [scenarios](Scenarios.md) for execution.
3. Defining [watchers](Watching.md) to monitor events and trigger actions.

Below, we provide an explanation based on two versions of the `Director` class: a comprehensive one and a more streamlined version.

## Detailed Explanation

### 1. Assigning Instructors

Instructors are used to initialize specific types with necessary configurations and behaviors.

- **Permissions Initialization**:
  Assigns default read-write execute permissions to `IPermission` roles using `Chaplin.Core.Security.PermissionInitialization.AllAccessInitialization`.

  ```C#
  AssignInstructorFor<IPermission>(Chaplin.Core.Security.PermissionInitialization.AllAccessInitialization);
  ```

- **Type-Specific Instructors**:
  Initializes other types such as `IMoney`, `ILineItem`, `IFormula`, and `IPerson` with their respective initializers.

  ```C#
  AssignInstructorFor<IMoney>(MoneyInitialization.Initialize);
  AssignInstructorFor<ILineItem>(LineItemInitialization.Initialize);
  AssignInstructorFor<IFormula>(Instructors.AliasInitializer);
  AssignInstructorFor<IPerson>(Instructors.AliasInitializer);
  ```

### 2. Preparing Scenarios

Scenarios are compositions of behaviors and actions that can be executed.
The `Director` prepares these scenarios by assigning default actions and validations.
By creating your own compositions and configuring them in the director, you can alter the behavior of these scenarios.

- **Checkout Scenario**:
  Defines actions for creating payments, receipts, and validating prices.

  ```C#
  PrepareCompositionFor<Checkout>(scenario =>
  {
      scenario.CreatePayment = Defaults.Payment.Defaults.CreateDummyPayment;
      scenario.CreateReceipt = Defaults.Invoicing.Default.Compositions.CreateReceipt;
      scenario.ValidatePrices = Defaults.PriceValidation.Empty.NoValidations;
  });
  ```

- **FullFill Scenario**:
  Sets the action for checking the payment status.

  ```C#
  PrepareCompositionFor<FullFill>(scenario =>
  {
      scenario.CheckStatus = Defaults.Payment.Mollie.Compositions.CheckStatus;
  });
  ```

### 3. Defining Watchers

Watchers monitor specific events within scenarios and trigger actions, such as sending emails or logging information.

- **Login Watcher**:
  Sends an email when the authenticated event of the login scenario is emitted.

  ```C#
  Watch<Login, Chaplin.Services.Postmark.MailWatcher<Login>>(l =>
  {
      l.Events = nameof(Login.Authenticated);
  });
  ```

- **Checkout and FullFill Watchers**:
  Sends an email for the `Checkout` and `FullFill` scenarios.

  ```C#
  Watch<Checkout, Chaplin.Services.Postmark.MailWatcher<Checkout>>();
  Watch<FullFill, Chaplin.Services.Postmark.MailWatcher<FullFill>>();
  ```

- **Debug Watcher**:
  Monitors all events and logs information when an event ends.

  ```C#
  WatchAll<DebugWatcher>(d =>
  {
      d.Events = "Ending";
  });
  ```

## Constructor

The `Director` constructor initializes the base `ContainerDirector` with the file system, configuration manager, and container builder.

```C#
public Director(IFileSystem fileSystem, IConfigurationManager cm, ContainerBuilder builder) 
    : base(fileSystem, cm, builder)
{
}
```

## Director Example

Here’s a more streamlined version of the `Director` class that focuses on the core functionalities:

```C#
namespace Chaplin.Demo.Server;

public class Director : ContainerDirector
{

    public Director(IFileSystem fs, IConfigurationManager config, ContainerBuilder container) : base(fs, config, container)
    {
    }

    public override void Incept()
    {
        // 1) -- Chaplin instructors
        
        AssignInstructorFor<IPermission>(Chaplin.Core.Security.PermissionInitialization.AllAccessInitialization);
        
        // 2) -- Chaplin prepare scenarios for playing
        
        // 3) -- Chaplin define watchers for all or per scenario.
        
        WatchAll<DebugWatcher>();

        Watch<Login, MailWatcher<Login>>(l =>
        {
            l.Events = nameof(Login.Authenticated);
        });
    }
}
```

## Summary

The `Director` class in Backlot is essential for managing permissions, initializing types, preparing scenarios, and defining watchers. By configuring these components, the `Director` ensures that the application runs smoothly and that specific actions are triggered based on defined events. This robust configuration allows for a flexible and maintainable server application.