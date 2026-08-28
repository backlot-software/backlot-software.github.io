+++
weight = 300
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "Program Cs"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

When you start an Azure Functions project, a `Program.cs` file is automatically generated.
The `Main` function in this file serves as the entry point for the application.
In this example, the Azure Functions project is configured with the name `Backlot.Server`.

The primary responsibilities of the `Program.cs` is to:

1. Initialize the base environment.
2. Configure middleware components.
3. Set up application-specific configurations.
4. Configure logging services.
5. Build and run the host.

## Base Initialization

The initialization begins with a call to `Base.Start()`, which sets up the foundational environment for the application. 
This step is vital for preparing any necessary pre-conditions or configurations required before the host is built.

```C#
Base.Start();
```

## Host Builder Configuration

The `HostBuilder` is then used to configure and build the application host.
The `ConfigureFunctionsWorkerDefaults` method is called to set up the default function worker, incorporating several middleware components:

- `AutofacScopeExecutor`: Ensures that Autofac is identified first for dependency injection.
- `Defender`: Provides defense mechanisms to check for the presence of specific forbidden keywords, and if found, it returns a BadRequest response with a message.
- `AuthenticationInitializer`: Sets up authentication processes.
- `SerilogContextEnrichment`: Enhances logging with Serilog by adding contextual information.

```C#
var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults(worker =>
    {
        worker.UseMiddleware<AutofacScopeExecutor>();
        worker.UseMiddleware<Defender>();
        worker.UseMiddleware<AuthenticationInitializer>();
        worker.UseMiddleware<SerilogContextEnrichment>();
    })
```

## Application Configuration with Backlot

The `ChaplinAppConfiguration` method configures the application using Backlot-specific services.
This involves setting up repositories, a file system, a configuration manager, a director, and a secret for token calculation.

1. **Repository Initialization**

   <tabs>
      <tab title="Memory Repositories">
   
      The example shows how to use `MemoryRelationRepository`, `MemoryPersistedRoleRepository`, and `DummyUnitOfWork`.   

      ```C#
         .ChaplinAppConfiguration<MemoryRelationRepository, MemoryPersistedRoleRepository, DummyUnitOfWork>(
      ```
   
      </tab>
      <tab title="RavenDB Repositories">
   
      The example shows how to use `RavenRelationRepository`, `RavenPersistedRoleRepository`, and `RavenUnitOfWork` to integrate RavenDB.

      ```C#
      .ChaplinAppConfiguration<RavenRelationRepository, RavenPersistedRoleRepository, RavenUnitOfWork>(
      ```
   
      </tab>
   </tabs>

2. **File System Initialization**

   <tabs>
      <tab title="LocalDiskStorage">
   
      The file system initialized using `LocalDiskStorage`.

      ```C#
      fileSystem: (context) => new LocalDiskStorage(),
      ```
   
      </tab>
      <tab title="BlobStorage">
   
      The file system initialized using BlobStorage can be initialized with the connection string from the configuration.

      ```C#
      fileSystem: (context) => new BlobStorage(context.Configuration["Chaplin.BlobConnectionString"]),
      ```
   
      </tab>
   </tabs>

3. **Configuration Manager Initialization**

   The configuration manager is initialized with a `JsonSettingsManager` and a `DuplexConfigurationSettingsManager`, managing settings from both JSON files and the application configuration.

    ```C#
    configurationManager: (context, fs) => 
    {
        var jsonSettingsManager = new JsonSettingsManager(context.Configuration["Chaplin.Environment"] ?? "local", fs);
        return new DuplexConfigurationSettingsManager(context.Configuration, jsonSettingsManager);
    },
    ```

4. **Director Introduction**

   The director is introduced, combining the file system, configuration manager, and builder.

    ```C#
    director: (_, fs, cm, builder) => new Director(fs, cm, builder),
    ```

5. **Secret Configuration**

   The secret is retrieved from the configuration and used for token calculations.

    ```C#
    secret: (context) => context.Configuration["Chaplin.Secret"]
    ```

```C#
.ChaplinAppConfiguration<MemoryRelationRepository, MemoryPersistedRoleRepository, DummyUnitOfWork>(
    fileSystem: (context) => new LocalDiskStorage(),
    configurationManager: (context, fs) => 
    {
        var jsonSettingsManager = new JsonSettingsManager(context.Configuration["Chaplin.Environment"] ?? "local", fs);
        return new DuplexConfigurationSettingsManager(context.Configuration, jsonSettingsManager);
    },
    director: (_, fs, cm, builder) => new Director(fs, cm, builder),
    secret: (context) => context.Configuration["Chaplin.Secret"]
)
```

## Logging Configuration with Serilog

Logging is configured using Serilog, an advanced logging library. The configuration ensures that logs are written to the console and allows for additional logging targets, such as Azure Table Storage.

```C#
.ConfigureServices((ctx, collection) => {
    collection.AddLogging(lb => lb
        .AddSerilog(ctx.Configuration,
            cfg => cfg.WriteTo.Console(),
            level: LogEventLevel.Debug
        )
    );
})
```

## Building and Running the Host

Finally, the host is built and run asynchronously, marking the culmination of the configuration process and the start of the application’s execution.

```C#
.Build();

await host.RunAsync();
```

## Complete Backlot Program.cs with RavenDB and BlobStorage

Here's how the Backlot configuration looks when using RavenDB as the database and BlobStorage as the file system:

```C#
namespace Backlot.Server
{
    public static class Program
    {
        public static async Task Main()
        {
            Base.Start();

            var host = new HostBuilder()
                .ConfigureFunctionsWorkerDefaults(worker =>
                {
                    worker.UseMiddleware<AutofacScopeExecutor>();
                    worker.UseMiddleware<Defender>();
                    worker.UseMiddleware<AuthenticationInitializer>();
                    worker.UseMiddleware<SerilogContextEnrichment>();
                })
                .ChaplinAppConfiguration<RavenRelationRepository, RavenPersistedRoleRepository, RavenUnitOfWork> (
                    fileSystem: (context) => new BlobStorage(context.Configuration["Chaplin.BlobConnectionString"]),
                    configurationManager: (context, fs) =>
                    {
                        var jsonSettingsManager = new JsonSettingsManager(context.Configuration["Chaplin.Environment"] ?? "local", fs);
                        return new DuplexConfigurationSettingsManager(context.Configuration, jsonSettingsManager);
                    }, 
                    director: (_, fs, cm, builder) => new Director(fs, cm, builder),
                    secret: (context) => context.Configuration["Chaplin.Secret"])
                .ConfigureServices((ctx, collection) => { collection.AddLogging(lb => lb
                        .AddSerilog(ctx.Configuration,
                            cfg => cfg.WriteTo.AzureTableStorage(ctx.Configuration["Chaplin.BlobConnectionString"]),
                            level: LogEventLevel.Debug
                        )
                    );
                })
                .Build();

            await host.RunAsync();
        }
    }
}
```