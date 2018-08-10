
# Hacker news feed

This project it's to keep updated with the latests post in [Hacker News](https://thehackernews.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Node 8.10.0
- Angular/Cli
- Docker
- Yarn
- MongoDB (docker run -d --name mongo -p 27017:27017 bitnami/mongodb)

### Installing

- Go to express folder and install dependencies
```
Yarn install
```
- Copy .env.template and configure the database connection
```
cp .env.template .env
```

- Go to web-app folder and install too
```
Yarn install
```

## Running the project

- Open a terminal and go to express folder and run the next command
```
Yarn start
```
- Open another terminar and go to the web-app folder and run
```
Yarn start
```

The project should open in a tab of browser, if not you can go to http://localhost:4200/
