# Contributing to GetLicensed

Contributions are what makes the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## House rules

- Before submitting a new issue or PR, check if it already exists in [issues](https://github.com/GetLicenseded/GetLicensed/issues) or [PRs](https://github.com/GetLicenseded/GetLicensed/pulls).
- If there isn't an issue please *create one* before any development begins
- GitHub issues: take note of the `needs-approval` label.
  - **For Contributors**:
    - Feature Requests / Refactoring on a Large Scale: Wait for an GetLicensed member to approve and remove the `needs-approval` label before you start coding or submitting a PR.
    - Bugs, Security, Documentation, etc.: You can start coding immediately, even if the `needs-approval` label is present. This label mainly concerns feature requests.
  - **Our Process**:
    - Issues from anyone not on the GetLicensed team automatically receive the `needs-approval` label.
    - We greatly value new feature ideas. To ensure consistency in the product's direction, they undergo review and approval.


## Developing

The development branch is `main`. This is the branch that all pull
requests should be made against.

To develop locally:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your
   own GitHub account and then
   [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch:

   ```sh
   git switch -c MY_BRANCH_NAME
   ```
3. cp .env.local .env

## Installing

GetLicensed uses [PNPM](https://pnpm.io/) for package management.

To install the project's dependencies, run `pnpm install`.

## Building

You can build the project with:

```bash
pnpm build
```
## Linting

To check the formatting of your code:

```sh
pnpm fmt
```

If you get errors, be sure to fix them before committing.

## Making a Pull Request

- Be sure to [check the "Allow edits from maintainers" option](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) while creating your PR.
- If your PR refers to or fixes an issue, be sure to add `refs #XXX` or `fixes #XXX` to the PR description. Replacing `XXX` with the respective issue number. See more about [Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
- Be sure to fill the PR Template accordingly.
