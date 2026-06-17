+++
weight = 100
date = "2026-06-15"
draft = false
author = "Jeroen Wijdven"
title = "FileSystem"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++


In the Backlot application, filesystem management is crucial for handling various types of data storage.
Two primary filesystem implementations, `LocalDiskStorage` and `BlobStorage`, are provided to accommodate different storage needs.
This section outlines their usage and functionality within Backlot.

## LocalDiskStorage

Stores files locally on the disk of the hosting environment.
Implements the `IFileSystem` interface with methods to interact with files on the local disk:

In `program.cs`, initialize `LocalDiskStorage` without additional parameters:

```C#
.ChaplinAppConfiguration<RavenRelationRepository, RavenPersistedRoleRepository, RavenUnitOfWork>(
    fileSystem: (_) => new LocalDiskStorage()
);
```

## BlobStorage

Stores files using Azure Blob Storage.
Implements the `IFileSystem` interface, similar to `LocalDiskStorage`, but interacts with Azure Blob Storage.
Ideal for scenarios requiring scalable and reliable storage in cloud environments, such as storing large files or media assets.

In `program.cs`, initialize `BlobStorage` with a connection string obtained from configuration:

```C#
.ChaplinAppConfiguration<RavenRelationRepository, RavenPersistedRoleRepository, RavenUnitOfWork>(
    fileSystem: (context) => new BlobStorage(context.Configuration["Chaplin.BlobConnectionString"])
);
```

## Typical Use Cases

- **Setting Files**: Both filesystems are used to store configuration files (`{environment}.jsonsettings.json`) managed by `JsonSettingsManager`.

- **User/Group Data**: Storage and retrieval of user and group information required for authentication and authorization purposes.

- **Templates**: Storage of templates used by components like `MailWatcher` for dynamic content rendering.
