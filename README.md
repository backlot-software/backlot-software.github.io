# Docs.Backlot.Software
Backlot documentation

This repository contains the source code for the Backlot documentation website, powered by [Hugo](https://gohugo.io/) and the [LotusDocs](https://lotusdocs.dev/) theme.

## Local Setup

To work on the documentation locally, you need to have Hugo and Go installed on your machine.

### Prerequisites

*   **Hugo Extended**: Ensure you install the **extended** version of Hugo to support SCSS compilation.
    *   [Installation Guide](https://gohugo.io/installation/)
*   **Go**: Required for Hugo Modules.
    *   [Installation Guide](https://go.dev/doc/install)
*   **Git**: For version control.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/backlot-software/backlot-software.github.io.git
    cd backlot-software.github.io
    ```

2.  **Start the development server:**
    ```bash
    hugo server -D
    ```

3.  **Preview the site:**
    Open your browser and navigate to `http://localhost:1313`.

## How to Collaborate

We welcome contributions to improve the Backlot documentation! To contribute, please follow these steps:

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork to your local machine.
3.  **Create a new branch** for your changes:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Make your changes** and preview them locally using `hugo server -D`.
5.  **Commit** your changes with a descriptive commit message.
6.  **Push** your changes to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Open a Pull Request** against the `main` branch of this repository. Your pull request will be reviewed and merged.

### Documentation Structure

*   All documentation content is located in the `content/docs/` directory.
*   Files are written in [Markdown](https://www.markdownguide.org/).

## License

This documentation and it's contributions are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Note: The CC BY 4.0 license applies solely to the documentation content in this repository. The software, packages, or other components referenced or linked within this documentation may be subject to their own respective licenses. The CC BY 4.0 license does not apply to such software or packages, and users must comply with the specific licenses governing those components.
