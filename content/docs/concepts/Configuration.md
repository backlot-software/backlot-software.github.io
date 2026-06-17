+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Configuration"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Configuration

In the Chaplin framework it is possible to customize the functionality for your projects using a configuration file.

## Jsonsettings

A json file in the root of the server project can be used as configuration file for your Chaplin project. The jsonsettings are configurable for multiple environments. The environment which is used is defined in the settings.json. The value of the property `Chaplin.Environment` is the prefix for the jsonsettings.

## Examples

### Multiple Environments

In this example we want to set up a json configuration file for a local environment.
If we want our project to use the configuration file `local.jsonsettings.json`, we need to add the following property to the file `local.settings.json`.

    "Values": {
        "Chaplin.Environment": "local"
    }

### Configurable Properties
Properties marked with the attribute `[Configurable]` can be customized in the jsonsettings.
Bellow is an example of a configurable property in a scenario `SayHi`.

    namespace Backlot.Demo.Server.Scenarios;

    [Scenario(typeof(SayHi), access: new []{ Access.Everyone })]
    public class SayHi : Scenario<IPerson, string>
    {
        [Configurable]
        public string Greeting { get; set; }

        public SayHi(IPerson role) : base(role)
        {
        }
    
        protected override string Exec()
        {
            return Greeting + Role.Name;
        }
    }

To set Greeting in the `local.jsonsettings.json` the following path is needed.
The path is build from the namespace, the class name en the name of the variable

    {
      "Backlot": {
        "Demo": {
          "Server": {
            "Scenarios": {
                "Greeting": "Hi "
            }
          }
        }
      }
    }

Only string and int variables are supported at the moment.