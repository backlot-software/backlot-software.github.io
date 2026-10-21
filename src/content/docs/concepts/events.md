---
title: Events
---

Events play a critical role in the Backlot framework by enabling the decoupling of actions and allowing different components to respond to specific moments in a scenario's lifecycle.
In the Movie pattern metaphor we call this `Watching`.
This chapter delves into the various events available in Backlot scenarios, their purposes, and how they can be utilized and monitored using watchers.

## Built-in Scenario Events

Backlot scenarios have several built-in events that are triggered at different stages of the scenario execution. These events include:
These events allow developers to hook into the scenario's lifecycle (Watching) and perform custom actions at specific points.
Here are the built-in events that are typically fired during scenario execution:

- `Before`: Fired before any validation or permission check.
- `Playing`: Triggered when the scenario starts playing.
- `Ending`: Triggered when the scenario ends.
- `After`: Fired after the scenario completes successfully, but not if validation fails.
- `Fired`: Triggered when another event is successfully fired.

## Custom Scenario Events

In addition to built-in events, custom events can also be defined and fired within scenarios.
For example, in a login scenario, an `Authenticated` event might be triggered upon successful authentication.

### Example of a Custom Event in a Scenario

Consider a login scenario where an `Authenticated` event is fired upon successful login:

```csharp
public class Login : Scenario<IAuth, bool>
{
    public event AsyncEventHandler<EventArgs> Authenticated;

    protected override async Task<bool> ExecAsync()
    {
        // Perform authentication logic
        var isAuthenticated = await AuthenticateUser(Role.Credentials);
        if (isAuthenticated)
        {
            // Fire the Authenticated event
            await FireAsync(Authenticated, nameof(Authenticated));
        }
    }
}
```

In this example, the `Authenticated` event is fired after a user is successfully authenticated.
This event can then be watched and responded to by other components.

## Example of Using Watchers to Monitor Events

Watchers in Backlot can be used to monitor these events and trigger actions when the events are fired.
The `Director` class can be configured to define watchers for these events.

Here's how you can configure watchers in the `Director` class to respond to specific events:

```csharp
public override void Incept()
{
    // Watch the Ending event of the Calculate scenario
    Watch<Calculate, DebugWatcher>(d =>
    {
        d.Events = "Ending"; // comma seperated in case you want add extra events.
    });
}
```

In this configuration:

- A `DebugWatcher` (namespace `Backlot.Http.Watching`) is set up to watch the `Ending` event in the `Calculate` scenario and post it to the configured webhook endpoint.

## Summary

Events in Backlot scenarios provide a powerful mechanism to hook into the scenario lifecycle and perform custom actions.
Additionally, watchers can be configured to monitor these events and trigger appropriate actions.
