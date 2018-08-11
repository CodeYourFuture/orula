# orula

Glasgow Graduation Project - Learning Platform

# Get started

1.  Go to `top level` folder, and run `npm install`
2.  Go to `top level` folder, and run `npm start`
3.  Go to `top level` folder, and run `npm run lint`
    - In order to fix errors, run `npm run lint -- --fix`

## Workflow

Our workflow is a variation of [Gitflow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)

1.  Pick an issue from Github (assign it to yourself and make sure there is enough description)

2.  Locally, switch to `master`, then `git pull upstream master`. NOTE: If you get a merge message, that means you made a mistake and you worked on `master` by accident. Clean your master (i.e. `git reset --hard previous_commit` - ask a mentor to help)

3.  Create a branch based on the story `git checkout -b feature-title`.

If you're working on a feature for _adding a student_, then name the branch `add-student` for example.

4.  Work on the branch (add, commit and push)

5.  Create a Pull Request when you are finished.

6.  Repeat.

# Database

The first time you create the database, you will need to run these commands (three of them separately) in `postgres`

```sql
DROP ROLE IF EXISTS cyf;
```

```sql
CREATE USER cyf WITH PASSWORD 'password';
```

```sql
CREATE DATABASE orula OWNER cyf;
```

## Migrations

We use `knex` for migrations, but we created alias helpers on `package.json` to make it easier to run the commands.

[knex](https://knexjs.org/)

1.  Create a migration `npm run create-migration table_name`
2.  Create a seed `npm run create-seed table_name`

## Recrete DB

From psql:

- `/c postgres`
-
- `CREATE DATABASE orula OWNER cyf;`

if it complains that there are active connections then run:

```sql
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'orula'
```
