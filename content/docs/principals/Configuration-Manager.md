+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Configuration Manager"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


This chapter of the documentation covers the configuration and ConfigurationManager of Backlot.
Backlot has two built-in configuration managers: the `JsonSettingsManager` and the `DuplexConfigurationManager`.

## JsonSettingsManager

The JsonSettingsManager is instantiated in the Program.cs file.
This manager expects an environment string and a filesystem object as parameters.
It looks for configurable values in the `{environment}.jsonsettings.json` file within the provided filesystem.

```C#
var jsonSettingsManager = new JsonSettingsManager("Development", fileSystem);
```

## DuplexConfigurationSettingsManager

The DuplexConfigurationManager is also instantiated in the Program.cs file.
It requires an IConfiguration object from the context and another configuration manager as parameters.
The DuplexConfigurationManager first checks for configurable values in the other configuration manager and uses the provided IConfiguration as a fallback (typically from Azure settings).

```C#
var duplexSettingsManager = new DuplexConfigurationSettingsManager(configuration, jsonSettingsManager);
```

## Using Configurable Attributes

The `[Configurable]` attribute is used to mark properties in classes that should be managed by the `ConfigurationManager`.
This allows the settings manager to load and update these properties based on the configuration files.

### Class with Configurable Properties

The `MailWatcher` class demonstrates how to use the `[Configurable]` attribute to mark properties for configuration management.

```C#
using Chaplin.Core.Abstraction.Configuration;

public class MailWatcher<TScenario> : ISceneWatcher<TScenario>
    where TScenario : IScenario
{
    [Configurable] public string Events { get; set; }
    private string[] EventItms => Events?.Split(",") ?? Array.Empty<string>();
    
    [Configurable] public string RequestUri { get; set; }
    [Configurable] public string ServerToken { get; set; }
    [Configurable] public string From { get; set; }
    [Configurable] public string FromName { get; set; }
    [Configurable] public string ReplyTo { get; set; }

    // Remaining class implementation...
}
```

### Configuration in JSON settings

Below is an example of how configuration settings for the `MailWatcher` can be defined in a JSON settings file:

```json
{
  "Chaplin": {
    "Services": {
      "Postmark": {
        "MailWatcher": {
          "From": "noreply-marvelous@mail.versla.io",
          "FromName": "Marvelous Solutions B.V.",
          "ReplyTo": "mail@marvelous.nl",
          "RequestUri": "https://api.postmarkapp.com/email",
          "ServerToken": "your-server-token",
          "Events": "Paid,Shipped"
        }
      }
    }
  }
}
```

## Runtime Configuration Management

Configuration settings can be viewed and modified at runtime using specific API endpoints.

### Viewing Configuration Info

To view configuration information, send a POST request to the following endpoint:

```http
POST {{host}}/api/role/director/configurationinfos
Authorization: bearer {{token}}
```

### Updating Configuration

To update a configuration setting, send a POST request to the following endpoint with the configuration details in the body:

```http
POST {{host}}/api/role/configurationinfo/tryupdateconfiguration
Authorization: bearer {{token}}
Content-Type: application/json
{
    "Name": "keyname",
    "Value": "value"
}
```

### Deleting Configuration

To delete a configuration setting, send a POST request to the following endpoint with the configuration name in the body:

```http
POST {{host}}/api/role/configurationinfo/trydeleteconfiguration
Authorization: bearer {{token}}
Content-Type: application/json
{
    "Name": "keyname"
}
```