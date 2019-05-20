# Contributing

If you are reading this, you are awesome! Thank you for deciding to help with Operational UI. Whether it is a bug fix, a new feature or improvement to our docs. All contributions our welcome, but before you start here are a couple of key things to go by.

## Getting Started

Please create a new branch from the latest `master` branch on your fork.

- Fork the Operation-UI library from github
- Clone your fork to your local machine `git clone git@github.com:<yourname>/operational-ui.git`
- Create a new branch `git checkout -b my-topic-branch`
- Make your changes, test and then push your code to `git push origin my-topic-branch`
- Visit **GitHub** and make your pull request

If you have an existing local repository, please update it before you start. So that you can avoid or minimize the chances of getting merge conflicts

- `git remote add upstream git@github.com:contiamo/operational-ui.git`
- `git checkout master`
- `git pull upstream master --rebase`
- `git checkout -b my-topic-branch`
- Make your changes, test and then push your code to make the pull request

## Local Setup

We use [`yarn`](https://yarnpkg.com/) to manage dependencies in this project. Once you have `yarn`, here's how you can get started locally.

In your terminal, run the following command:

`yarn`

To start a local development environment, run `yarn start` and you will be able to see all the components.

## Submitting a Pull Request

Pull requests are always greeted with happiness, but before opening a PR it is better to open an issue and discuss it with the team. We are very quick to respond and you’ll probably hear from us in a day (or two sometimes). If it’s a current issue that you want to work on, just leave a comment asking if you can take that issue. Sometimes an issue is already in progress of being fixed. This way, we can ensure that your precious time doesn’t get wasted.

Also as a guideline, always try to keep your PR as small as possible. Focus on one task at hand. One feature, one bug etc. If it’s more than one issue/feature it is better that you create multiple PRs for it rather then one.

As creating an issue or a pull request, please begin it with the following prefixes

- **`**Breaking:**`** (For a change that will break the API)
- **`**Feature:**`** (For when you add something that doesn’t break the API & adds more functionality to the current API)
- **`**Fix:**`** (For when you fix something that previously didn’t function or appear correctly)

Leaving this prefix off will prevent your PR from being included in the release. A good case to omit the prefix is when proposing infrastructural changes to the repository that doesn’t break the API. Following these rules helps us generate a nice changelog.

## Branch Structure

At any given time `master` branch points to the latest development iteration of the library.

Hot fixes, new features, documentation anything related is handled on a separate branch. Once it’s been thoroughly tested out. It is then merged with the `master` branch.

## License

By contributing your code to Operational-UI, you agree to licence your contribution under the MIT license.
