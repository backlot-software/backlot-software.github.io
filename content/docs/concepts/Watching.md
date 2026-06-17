+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Watching"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


Watchers can be configured for watching scenarios in the `Director`.
Watchers can act on events which are fired in the scenario.
All scenarios trigger 4 events by default: Before, Playing, Ending and After.

## SceneWatcher

A SceneWatcher is used for watching events for a specific scenario. It will be implemented like this:

```C#
    public class ShipmentWatcher : ISceneWatcher<FullFill>
    {
        public void Watch(FullFill scenario)
        {
            scenario.Ending += (_, _) =>
            {
```

Another pattern can be to use a generic scenewatcher. This way you can implement generic logic for a watcher, but it still is only registered for a specific scenario. An example of such a watcher can be found in the paragaph below.

## BingeWatcher

A BingeWatcher is used for watching events for a every scenario.
This could be useful when events which get triggered in multiple scenarios needs to be handled in the same way.

## Examples

In this example a scenario with 2 operations fires an event when the first operation is done. In addition an example of a SceneWatcher is made. This SceneWatcher will be logging the results from the first operation.

**Step 1: Add EventHandler**

In the code below the property `Operation1Executed` is added to the scenario `Calculate`. When the first operation is done the scenario fires the event.

```C#
    [Scenario(typeof(Calculate))]
    public class Calculate : Scenario<IFormula, decimal>
    {
        public Func<int, int, decimal> Operate { get; set; }
    
        public event EventHandler<EventArgs> Operation1Executed;
    
        public Calculate(IFormula role) : base(role)
        {
        }
    
        protected override decimal Exec()
        {
            var operation1Result = Operate.Invoke(Role.Number1, Role.Number2);
    
            Fire(Operation1Executed, nameof(Operation1Executed), new OperationEventArgs(operation1Result));
    
            return SecondOperation(operation1Result);
        }

        private static decimal SecondOperation(decimal number)
        {
            return number * 2;
        }
    }
```

In the OperationEventArgs the arguments are given for the event. In this example only a decimal is used as argument.

```C#
    public class OperationEventArgs : EventArgs
    {
        public readonly decimal OperationResult;
    
        public OperationEventArgs(decimal operationResult)
        {
            OperationResult = operationResult;
        }
    }
```

**Step 2: Create the SceneWatcher**

The example is watching to 3 events from the `Calculate` scenario.
It logs a message before the scenario starts playing, when the first operation is done and lastly after the scenario has ended.

```C#
    public class CalculateWatcher : ISceneWatcher<Calculate>
    {
        private readonly ILogger<CalculateWatcher> _logger;
        public CalculateWatcher(ILogger<CalculateWatcher> logger)
        {
            _logger = logger;
        }

        public void Watch(Calculate scenario)
        {
            scenario.Before += (sender, args) =>
            {
                var message = $"Calculate started";
                _logger.LogInformation(message);
            };
            scenario.Operation1Executed += (sender, args) =>
            {
                var message = $"{nameof(scenario.Operation1Executed)} with value: {args.OperationResult}";
                _logger.LogInformation(message);
            };
            scenario.After += (sender, args) =>
            {
                var message = $"Calculate ended";
                _logger.LogInformation(message);
            };
        }
    }
```

**Step 3: Configure the Director**

Lastly, the SceneWatcher needs to be configured in the `Director`.

```C#
    public static void InviteWatchers(ContainerBuilder builder)
        {
            builder.RegisterType<CalculateWatcher>()
                .As<ISceneWatcher<Calculate>>();
        }
```

**Generic scene watcher**

An example of a generic watcher is the Mailwatcher. It can watch basically every scenario and send mails based on that scenario. It's implemented like this:

```C#
    public class MailWatcher<TScenario> : ISceneWatcher<TScenario>
        where TScenario : IScenario
    {   
        public void Watch(TScenario scenario)
        {
            scenario.After += (sender,  obj) =>
            {
```

And registered inside the director like below. And in this case a mail is used when calculate is finished. 

```C#
    builder.RegisterType<Chaplin.Services.Postmark.MailWatcher<Calculate>>()
    .As<ISceneWatcher<Calculate>>();
```