+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Versioning"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Versioning

Versioning is crucial in managing and maintaining software projects, ensuring that changes are systematically tracked and communicated.
In Backlot, we follow a structured versioning scheme inspired by Semantic Versioning to provide clear and consistent updates.

## Version Numbering

Our version numbers are structured as follows: **MAJOR.MINOR.PATCH**

### MAJOR
The first number indicates the .NET version used:
- `0` = .NET 10 = LTS
- `1` = .NET 11
- `2` = .NET 12 = LTS
- etc.

### MINOR
The second number indicates releases that contain breaking changes and new features.

### PATCH
The third number is for non-breaking bug fixes.

## Guidelines for Versioning

### Major and Minor Version Changes
- **Release Announcements**: For all major and minor version changes, a release announcement is created to inform users of the new features or breaking changes.

### Patch Releases
- **Release Comments**: For all patch releases, a comment is added to the existing release announcement to document the fixes included.

### Final Builds
- **Main Branch**: Final builds are only executed on the main branch.
- **Tags and Releases**: Every final version gets tagged and released on our Git repository.
For more information on managing releases, see the [GitHub Docs](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

### Development Process
- **Version Number Updates**: When changes are merged into the development branch, the merger needs to update the version number as the first commit after the merge action.
This can be done using the `build.ps1` script.
- **Feature Development**: When starting to develop a feature, the developer chooses a version number higher than the current origin.
Feature releases are always built with the default build parameter (`Debug`), resulting in alpha version numbers for each build.
Developers may choose to push these to the NuGet repository.

### Branching and Releasing
- **Beta Versions**: Once a beta version is released, a branch is created for the specific minor release. For example:
  - `/release/v0.1`
  - `/release/v1.2`
- **Main Branch Stability**: The main branch contains the latest stable build (without a beta suffix).
Releases on the main branch are tagged accordingly.
- **Merging**: Versions are merged from the `/release/vX.X` branch to the main branch.
The develop branch is merged into a `/release/vX.X` branch.