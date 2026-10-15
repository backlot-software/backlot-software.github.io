---
title: FileSystem
---

In the Backlot application, filesystem management is crucial for handling various types of data storage.
Two primary filesystem implementations, `LocalDiskStorage` and `BlobStorage`, are provided to accommodate different storage needs.
This section outlines their usage and functionality within Backlot.

## LocalDiskStorage

Stores files locally on the disk of the hosting environment.
Implements the `IFileSystem` interface with methods to interact with files on the local disk:

In `Program.cs`, create a `LocalDiskStorage` without additional parameters and pass it to the director:

```csharp
.ConfigureBacklotWeb((configuration, builder) =>
{
    var fs = new LocalDiskStorage();
    // ... create the configuration manager as shown in Program.cs
    return new Director(fs, configurationManager, builder);
})
```

## BlobStorage

Stores files using Azure Blob Storage.
Implements the `IFileSystem` interface, similar to `LocalDiskStorage`, but interacts with Azure Blob Storage.
Ideal for scenarios requiring scalable and reliable storage in cloud environments, such as storing large files or media assets.

In `Program.cs`, initialize `BlobStorage` (namespace `Backlot.Services.Filesystem.BlobStorage`) with a connection string obtained from configuration. The configuration key is up to you; `Backlot.BlobConnectionString` is used here:

```csharp
.ConfigureBacklotWeb((configuration, builder) =>
{
    var fs = new BlobStorage(configuration["Backlot.BlobConnectionString"]);
    // ... create the configuration manager as shown in Program.cs
    return new Director(fs, configurationManager, builder);
})
```

## Typical Use Cases

- **Setting Files**: Both filesystems are used to store configuration files (`{environment}.jsonsettings.json`) managed by `JsonSettingsManager`.

- **User/Group Data**: Storage and retrieval of user and group information required for authentication and authorization purposes.

- **Templates**: Storage of templates used by components such as mail watchers for dynamic content rendering.
