+++
weight = 100
date = "2026-06-15"
draft = true
author = "Jeroen Wijdven"
title = "Getting Started"
icon = "rocket_launch"
toc = true
publishdate = "2026-06-15"
+++

# Getting Started

## Solution Setup

When a Backlot server is ordered a default Backlot solution is created which you can clone from the given git repository. Containing the latest package versions of Backlot. Clone this git repository and add your own code. The basic folder structure for applications is:

<code-block>
├── Yourname.Backlot.Server
│   ├── Director.cs
│   ├── Runner.cs
│   └── Program.cs
├── Yourname.Backlot
│   ├── Scenarios
│   └── Roles
</code-block>

For more complex scenarios developers are free to choose another structure. The files and folders explained:

### Yourname.Backlot.Server

Is your startup application.

- Director.cs, is the file where you define all generics, like watchers, instructors and where you define composistions (if needed.). It also is the place to register custom registrations for DI, when it's needed.

- Runner.cs, is a test endpoint running out of the Backlot scope. It shows if the server is online, all .net core middleware is running and which version of Backlot is installed.

- Program.cs, is the default .net core registration. It basically defines how Backlot needs to be started, which filesystem, configuration system and which director is used. It's needed for startup, from there the director takes over.

### Yourname.Backlot

Is your actual application. Containing all scenarios (business logic) and roles (entity definitions).

- Scenarios, contains all sceanrios you created.
- Roles, contains all roles you created.

## Start Programming

When start programming. It's good to start reading our [blog][2]. Here you can read more about the concepts of scenario (our building block) based programming (we named it "The Movie Pattern"). And read some articles to set the first steps.

### Nuget Package Repository

When setting up solutions your self. There is a private nuget repository available at: https://nugetmarvelous.blob.core.windows.net/feed/index.json.

## Backlot Source Setup

When using the Backlot source instead of the packages, Backlot requires a certain folder structure. This can be usefull in debugging situations or situations where you like to collaborate on source code. For this folder structure there is a bash installer that clones the projects. Subsequently, the installer will determine, based on a config file that you set, which projects should be made into packages. When using the installer the relative paths are the same for everyone on every computer. This way we make sure references between the projects are correct.

### How to use the Installer Script

 1. Choose your root folder. An empty folder is recommended since the installer might loop trough all .csproj files in this folder and its descendants.

 2. [Download][1] the installer and InstallerSettings files and put these files in your root folder.

 3. Configure the InstallerSettings.

 4. Run the installer. Tip: opening with Git for Windows runs the script.

 5. Enable multi-repo support in your IDE.  

### Running into problems?

***Repos are not cloned***  
The first time the script runs sometimes the user isn't authorized to clone some of the repos. Running the script a second time seems to fix it.

## Server Setup

A Backlot server can be ordered and setup at our hosting partner. Self hosting is possible. A Marvelous engineer can help you out.


  [1]: https://3.basecamp.com/3094795/buckets/24365546/vaults/6033645375
  [2]: https://codevelo.us/category/software-development/Backlot/