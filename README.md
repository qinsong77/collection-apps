# Turborepo starter with pnpm

This is an official starter turborepo.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a packages manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org) app
- `web`: another [Next.js](https://nextjs.org) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo@latest` command, and selected when choosing which package manager you wish to use with your monorepo (pnpm).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)

跑单个App
```shell
turbo run dev --scope='web' --include-dependencies --no-deps
turbo run dev --filter=web
```
`turbo run dev --filter=app1` **app1是package.json 内的名字**

 删除缓存
```shell
rm -rf .turbo

# 删除所有node_modules
find . -name "node_modules" -type d -exec rm -rf '{}' +
```


pnpm dlx replace npx

pnpm dlx create-react-app cra-ts --template typescript


### error list

#### when run dev
```
@react-ts/app1:dev: [webpack-cli] Unable to load '@webpack-cli/serve' command
@react-ts/app1:dev: [webpack-cli] TypeError: options.forEach is not a function
```
升级到最新版本解决
```
# old
    "webpack": "5.36.2",
    "webpack-cli": "4.7.2",
    "webpack-dev-server": "3.11.2"
# new
    "webpack": "5.73.0",
    "webpack-cli": "4.10.0",
    "webpack-dev-server": "4.9.3"

```
```shell
# 给一个应用装包
 pnpm i --filter "@mf.shared-routing/shell" clsx  
```
