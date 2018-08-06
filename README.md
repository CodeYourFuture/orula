# orula

Glasgow Graduation Project - Learning Platform

# Get started

1.  Go to `top level` folder, and run `npm install`
2.  Go to `top level` folder, and run `npm start`

## Workflow

Our workflow is a variation of [Gitflow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)

1.  Pick an issue from Github (assign it to yourself and make sure there is enough description)

2.  Locally, switch to `master`, then `git pull upstream master`. NOTE: If you get a merge message, that means you made a mistake and you worked on `master` by accident. Clean your master (i.e. `git reset --hard previous_commit` - ask a mentor to help)

3.  Create a branch based on the story `git checkout -b feature-title`.

If you're working on a feature for _adding a student_, then name the branch `add-student` for example.

4.  Work on the branch (add, commit and push)

5.  Create a Pull Request when you are finished.

6.  Repeat.


