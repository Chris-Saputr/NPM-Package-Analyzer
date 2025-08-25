# NPM Package Dependency Analyze
This project is a single web application that analyzes a public NPM package and generates a dependency report card, helping developers make informed decisions about the library they use. The application fetches the metadata directly from https:∕∕registry.npmjs.org∕ and displays brief descriptions of versions, last updated, size of the file and so on.

## Features
Package scorecards that includes
- Current version
- Licence
- Weekly Downloads
- Number of Dependencies
- Unpacked File Size
- Date of Last Published

## How to run (With Docker Installed)
1. Clone the repository by entering ```git clone https://github.com/Chris-Saputr/NPM-Package-Analyzer.git``` on Powershell/Command Prompt/Git Bash

2. Go into the directory where NPM-Package-Analyzer is located by entering ```cd NPM-Package-Analyzer on the terminal```

3. Build and start the container by entering ```docker compose up --build```

