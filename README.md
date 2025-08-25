# NPM Package Dependency Analyzer

## Project Abstract
NPM Package Dependency Analyzer is a single web application that analyzes a public NPM package and generates a dependency report card, helping developers make informed decisions about the library they use. The application fetches the metadata directly from https:∕∕registry.npmjs.org∕ and displays brief descriptions of versions, last updated, size of the file and so on.

## Features
Package scorecards that includes
- Current version
- Licence
- Weekly Downloads
- Number of Dependencies
- Unpacked File Size
- Date of Last Published

## How to run (With Docker Installed)
1. Open Powershell/Command Prompt/Git Bash and Clone the repository by entering `git clone https://github.com/Chris-Saputr/NPM-Package-Analyzer.git`

2. Go into the directory where NPM-Package-Analyzer is located by entering `cd NPM-Package-Analyzer on the terminal`

3. Build and start the container by entering `docker compose up --build`

4. Open up a web browser of your choice, and enter `http://localhost:8080/` 

## Key Design Choices
This application utilizes React + Vite for simplicity, fast builds, and reliability. Vite is a JS bundler, which could be run on most browser by transforming the React JSX code into raw HTML, CSS, and JavaScript files. 

This app also utilizes NGINX for speed, efficiency, and flexibility. While NGINX doest support directory level configurations, it helps increases the site performances. Especially since we only have singular web page.
