+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Scenarios"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Scenarios

A scenario is a combination of actions being performed following a script. In the Chaplin framework we call these actions compositions. A scenario can be played by calling its endpoint or  programmatically by a play method on the playing actor.

## FuncScenario

A FuncScenario is a scenario which is programmed in a static function instead of a class. A FuncScenario is quicker to setup but provides less configuration options.

## Events

A scenario can trigger events by using the `Fire()` method. Events can be fired asynchronous as well with the `FireAsync()` method. When a scenario is watched by a watcher, the watcher can act on the events which are fired. All scenarios trigger 4 events by default: Playing, Ending, Before and After.

## Composition

The composition pattern has been introduced as an alternative for the provider pattern. The composition pattern can be used for the same use cases. Chaplin uses composition because the pattern fits better with the movie pattern in which the director is responsible for the composition of a scenario.

## Examples

The scenario `Calculate` with the role `Formula` needs to calculate a number based on 2 numbers. Customer A wants the sum of those numbers and Customer B wants you to multiply them. With the composition pattern you are able to use the same scenario for both customers and you will only need to change the Director in each customer's individual server project.

> Note: This is a just a simple example. In practice we would recommend to use the composition pattern for more complex problems.

**Step 1: Build the scenario**

If you want the director to compose certain parts of a scenario, we have to start by making the scenario itself.

    using Chaplin.Core;
    using Chaplin.Core.Abstraction.Scenarios;
    
    namespace Chaplin.Demo;
    
    [Scenario(typeof(Calculate))]
    public class Calculate : Scenario<IFormula, decimal>
    {
        public Func<int, int, decimal> Operate { get; set; }
    
        public Calculate(IFormula role) : base(role)
        {
        }
    
        protected override decimal Exec()
        {
            return Operate.Invoke(Role.Number1, Role.Number2);
        }
    }

**Step 2: Create the compositions**

In this step we make the operations for each client. In this example they are static methods in the same class but this isn't necessary at all. You could create new projects for each customer and place the composition in there.

    namespace Chaplin.Demo
    {
        public static class Compositions
        {
            public static decimal Sum(int number1, int number2)
            {
                return number1 + number2;
            }
    
            public static decimal Multiply(int number1, int number2)
            {
                return number1 * number2;
            }
        }
    }

**Step 3: Configure the Director**

In the Director we register a new Composer in the `CollectComposers` method. In the Composer you can access a scenario's properties. In this case we set the `Operate` property to the desired operation for each customer.

`CollectComposers` method Customer A:

    public static void CollectComposers(ContainerBuilder builder)
        {
            builder.Register(_ => new Composer<Calculate>(scenario =>
            {
                scenario.Operate = Compositions.Sum;
            }));
        }

`CollectComposers` method Customer B:

    public static void CollectComposers(ContainerBuilder builder)
        {
            builder.Register(_ => new Composer<Calculate>(scenario =>
            {
                scenario.Operate = Compositions.Multiply;
            }));
        }


## Related articles
[Scenario based programming](https://codevelo.us/2023/08/23/chaplin-scenario-based-programming/)