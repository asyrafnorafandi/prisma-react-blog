[![Core unit tests](https://github.com/asyrafnorafandi/prisma-react-blog/actions/workflows/test.yaml/badge.svg)](https://github.com/asyrafnorafandi/prisma-react-blog/actions/workflows/test.yaml)

# Simple Blog using Prisma & React

![demo](./docs/demo.gif)

This repo is just a simple test blog web application that utilizes the following technology stack:

- ReactJS
- NodeJS
- ExpressJS
- Prisma
- Postgres
- Tailwind CSS

## Getting started

Both core backend and web frontend have their own `Dockerfile`. Use the following command to run the stack all-together:

```bash
# Bring core, web and db service
$ docker-compose up -d

# Check services are running
$ docker ps
```

Ensure that database schema is migrated as follows:

```bash
$ cd core
# Install dependencies
$ npm install

# Migrate db schema
$ npx prisma migrate dev

# Seed with fake data (Optional)
$ npx prisma db seed --preview-feature
```

Visit http://localhost:3000 to check web app is running.
