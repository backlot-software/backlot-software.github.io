+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Versioning Old"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Versioning

The versioning of Chaplin and all implementations of Chaplin uses [Semantic Versioning (SemVer)][1] to version the projects.
This page contains a global explanation of SemVer and how to use it with Chaplin projects and other implementations of Chaplin.
To learn more about SemVer read [the documentation][2].

## SemVer
SemVer is a versioning system where every part of the version changes the meaning of the version.
The standard version is a three part version, for example: 1.0.3.
This version conveys that this is the first major version with three bug fixes.
The 1 stands for a major change in other words a breaking change.
When you update the dependency there is a big chance that you need to make changes to the code to make it work again.
When the 0 changes to a one there is a new feature.
It is possible that you can change somethings to your code to make something faster but there are no breaking changes.
When the 3 changes to a 4 there is a new bug fixed. There is nothing that changes the code for the user of the dependency. It is also possible to add alpha, beta and rc after the version numbers. An example to show how versions compare to each other: 1.1.0 > 1.0.2 > 1.0.1 > 1.0.1-rc > 1.0.1-beta > 1.0.1-alpha > 1.0.1-alpha.1.

## How to use
Chaplin uses the following versioning conventions: When a feature is build the feature will receive an alpha suffix with a build number. When a feature is merged to development the version suffix should be beta. When a feature is merged to main the suffix must be  rc or completely removed. This can be pushed to a feed. When the main and develop have no differences the main and develop version must be the same. 

### Managing versions

When a new feature branch is made go to the project file and change the version prefix based on the rules above. 
There are three configurations: Release, Development and Debug. the configurations will change the suffix of the version. Debug: -alpha+(meta data based on Datetime), Development: -beta, Release: no suffix. Change the configuration for your project according to the branch you are on: main: release, development: Development and feature: Debug.

When a new project is made the project file should have propertyGroups that should look like the example below.
    
    <PropertyGroup>
        <TargetFramework>net7.0</TargetFramework>
        <ImplicitUsings>enable</ImplicitUsings>
        <Nullable>disable</Nullable>
		<VersionPrefix>1.0.0</VersionPrefix>
		<VersionSuffix></VersionSuffix>
        <Title>Chaplin.Services.RavenDb</Title>
        <Authors>Marvelous Solutions B.V.</Authors>
        <Copyright>(c) copyright Marvelous Solutions B.V. 2021</Copyright>
        <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
        <Configurations>Debug;Release;Development</Configurations>
    </PropertyGroup>


	<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
		<VersionSuffix>alpha+$([System.DateTime]::UtcNow.ToString(yyyyMMdd-HHmm))</VersionSuffix>
	</PropertyGroup>

	<PropertyGroup Condition="'$(Configuration)' == 'Development'">
		<VersionSuffix>beta</VersionSuffix>
	</PropertyGroup>


*** When using the Chaplin build script versions are automatically managed in all .csproj files ***


## Examples
Some of the scenario's that can occur with versioning and working on different branches:

![one feature][3]

This examples shows a new feature with a version update.

![hotfix][5]

This examples shows a hotfix and a new feature. Notice how the hotfix will make a new version of main. That main version becomes the develop version and when the feature is merged into develop the version will change again.


  [1]: https://semver.org/
  [2]: https://semver.org/
  [3]: one-feature.png
  [4]: two-features.png
  [5]: hotfix.png