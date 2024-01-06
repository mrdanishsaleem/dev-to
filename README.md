# Unclutter Your GitHub Stars: Creating an npm Package for Effortless Repo Unstarring

GitHub stars are an excellent way to bookmark repositories, but as time passes, they accumulate into an overwhelming pile. As a developer, I found myself drowning in a sea of starred repos, making it challenging to find the ones I actually use. Frustrated by the lack of efficient solutions, I embarked on a mission to simplify this chaos.

## The Problem

The issue with GitHub stars isn't just about quantity; it's about organization. Clicking through each repository to unstar them manually isn't just tedious; it's impractical. The existing scripts and solutions out there fell short—they lacked usability or simply didn't address my needs.

## The Idea

Enter my npm package—an attempt to streamline the un-starring process. I wanted something that could effortlessly unstar repositories without pagination limitations, making the clutter disappear with a single command.

## The Development Process

### Conceptualization

I envisioned a tool that leverages the GitHub API to list and unstar repositories efficiently. The Octokit library became instrumental, providing a robust interface to interact with GitHub's API.

### Coding Journey

The development phase involved creating an interactive CLI tool using Node.js and the Octokit library. Handling user input and integrating API calls to unstar repositories were the pivotal aspects of the code.

```javascript
#!/usr/bin/env node

/*
 * Author: Danish Saleem
 * GitHub: mrdanishsaleem
 * name: GitHub Unstar Pro
 * version: 2.0.2
 */

"use-strict";

const inquirer = require("inquirer");
const { Octokit } = require("@octokit/core");

async function unstarRepositories(pat, repositories) {
    const octokit = new Octokit({ auth: pat });

    for (const repo of repositories) {
        try {
            await octokit.request("DELETE /user/starred/{owner}/{repo}", {
                owner: repo.owner.login,
                repo: repo.name,
            });
            console.log(`Unstarred: ${repo.owner.login}/${repo.name}`);
        } catch (deleteErr) {
            if (deleteErr.status === 404) {
                console.error(`Repository ${repo.owner.login}/${repo.name} not found or inaccessible.`);
            } else {
                console.error(`Failed to unstar ${repo.owner.login}/${repo.name}:`, deleteErr.message);
            }
        }
    }
}

async function unstarPlease(pat) {
    try {
        const octokit = new Octokit({ auth: pat });
        const { data } = await octokit.request(`GET /user/starred`);

        if (Array.isArray(data) && data.length !== 0) {
            await unstarRepositories(pat, data);
        } else {
            console.log("No repositories to unstar.");
        }
    } catch (err) {
        console.error(err);
    }
}

inquirer
    .prompt([
        {
            type: "input",
            name: "pat",
            message: "Please enter your Personal access token:",
            default: "",
        },
    ])
    .then(function ({ pat }) {
        unstarPlease(pat);
    })
    .catch(function (error) {
        if (error.isTtyError) console.error(error.isTtyError, error);
        console.error(error);
    });
```

## Testing and Refinement

Testing was crucial to ensure the reliability of the unstar functionality. I tested various scenarios, handling errors like 404 (Not Found) gracefully. Iterative refinements were made based on testing results.

## Publishing the Package

### NPM Deployment

Publishing the npm package involved following the standard procedure: creating a `package.json` file, ensuring proper documentation, and using the `npm publish` command.

### `package.json`

```javascript
{
    "name": "github-unstar-pro",
    "version": "2.0.6",
    "description": "Unstar all Github repositories using a personal access token",
    "main": "index.js",
    "repository": "mrdanishsaleem/github-unstar-pro",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Danish Saleem",
    "license": "ISC",
    "bin": {
        "github-unstar-pro": "./index.js"
    },
    "keywords": [
        "node"
    ],
    "files": [
        "index.js"
    ],
    "dependencies": {
        "@octokit/core": "^3.5.1",
        "inquirer": "^8.2.0"
    },
    "devDependencies": {}
}
```

### Considerations

I ensured the package had clear instructions for users, guiding them on how to use it effectively. Keeping dependencies minimal and code efficient was a priority.

## Conclusion

From identifying a personal pain point to creating a solution, this journey taught me valuable lessons. Creating an npm package isn't just about writing code; it's about understanding user needs and crafting a seamless experience. I invite fellow developers to try out my [npm package](https://www.npmjs.com/package/github-unstar-pro) and provide feedback.

🔗 [GitHub Repository](https://github.com/mrdanishsaleem/github-unstar-pro)
