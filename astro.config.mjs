import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid';
// @ts-check
import { defineConfig } from 'astro/config';
import { sidebar, siteTitle } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.backlot.software',
  integrations: [
    mermaid({
      theme: 'dark',
      autoTheme: true
    }),
    starlight({
      title: siteTitle,
      components: {
        Header: './src/components/Navbar.astro',
        Hero: './src/components/HomeHero.astro',
        PageTitle: './src/components/PageTitle.astro',
        Sidebar: './src/components/Sidebar.astro'
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/backlot-software' }],
      sidebar,
      customCss: ['./src/styles/global.css']
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
