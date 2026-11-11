import type { StarlightUserConfig } from '@astrojs/starlight/types';

// Shared by the Starlight config and the /llms.txt and /llms-full.txt routes.

export const siteTitle = 'Backlot Docs';

export const siteDescription =
  'Backlot is a .NET framework for building backend applications on Azure Functions. Application logic is organised into scenarios, in which actors play roles, and is configured by a director.';

export const sidebar = [
  {
    label: 'Introduction',
    items: [
      { label: 'Introduction', slug: 'introduction' },
      { label: 'Getting started', slug: 'introduction/getting-started' },
      { label: 'Program.cs', slug: 'introduction/program-cs' },
      { label: 'Director configuration', slug: 'introduction/director-configuration' },
      { label: 'Configuration', slug: 'introduction/configuration' }
    ]
  },
  {
    label: 'Concepts',
    items: [
      { label: 'Actor', slug: 'concepts/actor' },
      { label: 'Presenting', slug: 'concepts/presenting' },
      { label: 'Scenarios', slug: 'concepts/scenarios' },
      { label: 'Roles', slug: 'concepts/roles' },
      { label: 'Instructors', slug: 'concepts/instructors' },
      { label: 'Director', slug: 'concepts/director' },
      { label: 'Watching', slug: 'concepts/watching' },
      { label: 'Events', slug: 'concepts/events' },
      { label: 'Search', slug: 'concepts/search' }
    ]
  },
  {
    label: 'Principals',
    items: [
      { label: 'GET vs. POST', slug: 'principals/get-vs-post' },
      { label: 'Persisted Role Repository', slug: 'principals/persisted-role-repository' },
      { label: 'Relation Repository', slug: 'principals/relation-repository' },
      { label: 'Unit of Work', slug: 'principals/unit-of-work' },
      { label: 'FileSystem', slug: 'principals/filesystem' },
      { label: 'Configuration Manager', slug: 'principals/configuration-manager' },
      { label: 'Versioning', slug: 'principals/versioning' }
    ]
  },
  {
    label: 'Logging and Exception Handling',
    link: 'logging-and-exception-handling'
  },
  {
    label: 'Testing Conventions',
    link: 'testing-conventions'
  }
] satisfies StarlightUserConfig['sidebar'];
