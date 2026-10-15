// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.backlot.software',
	integrations: [
		mermaid({
			theme: 'dark',
			autoTheme: true
		}),
		starlight({
			title: 'Backlot Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/backlot-software' }],
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'Introduction', slug: 'introduction' },
						{ label: 'Getting started', slug: 'introduction/getting-started' },
						{ label: 'Program.cs', slug: 'introduction/program-cs' },
						{ label: 'Director configuration', slug: 'introduction/director-configuration' },
						{ label: 'Configuration', slug: 'introduction/configuration' },
					],
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
						{ label: 'Search', slug: 'concepts/search' },

					],
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
						{ label: 'Versioning', slug: 'principals/versioning' },
					],
				},
				{
					label: 'Logging and Exception Handling',
					link: 'logging-and-exception-handling',
				},
				{
					label: "Testing Conventions",
					link: 'testing-conventions',
				}
			],
			customCss: ['./src/styles/global.css'],
		}),

	],
	vite: {
		plugins: [tailwindcss()],
	},
});
