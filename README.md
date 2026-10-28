# Docs.Backlot.Software

Backlot documentation

This repository contains the source code for the Backlot documentation website, powered by [Astro Starlight](https://starlight.astro.build/).

## Local Setup

To work on the documentation locally, you need to have Node.js, npm, and Git installed on your machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed to run the development server.
  - [Installation Guide](https://nodejs.org/en/download/)
- **npm**: Node.js package manager, usually comes with Node.js.
  - [Installation Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- **Git**: For version control.
  - [Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Running Locally

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/backlot-software/backlot-software.github.io.git
    cd backlot-software.github.io
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  **Preview the site:**
    Open your browser and navigate to `http://localhost:4321`.

## How to Collaborate

We welcome contributions to improve the Backlot documentation! To contribute, please follow these steps:

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork to your local machine.
3.  **Create a new branch** for your changes:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Make your changes** and preview them locally using `npm run dev`.
5.  **Commit** your changes with a descriptive commit message.
6.  **Push** your changes to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Open a Pull Request** against the `develop` branch of this repository. Your pull request will be reviewed and merged.

### Documentation Structure

- All documentation content is located in the `src/content/docs/` directory.
- Files are written in [Markdown](https://www.markdownguide.org/).
  - Files may use MDX for when components are needed within the documentation, such as tabs. We heavily discourage using MDX and prefer sticking to standard Markdown whenever possible.

### Shared Navigation and Homepage

`src/components/Navbar.astro` is the shared Starlight header for every page, registered in `astro.config.mjs`.
Update its links to change the site navigation. The homepage hero is rendered by `HomeHero.astro`, with its title and tagline configured in `src/content/docs/index.mdx`.
`HomeSearch.astro` submits the typed query to Starlight's built-in search. Search results require a production build; the development server shows Starlight's search notice.

Run the homepage regression checks after building:

```bash
npm run build
node --test tests/homepage.test.mjs
```

## License

This documentation and it's contributions are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Note: The CC BY 4.0 license applies solely to the documentation content in this repository. The software, packages, or other components referenced or linked within this documentation may be subject to their own respective licenses. The CC BY 4.0 license does not apply to such software or packages, and users must comply with the specific licenses governing those components.
