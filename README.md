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

# Note

### command line

- [Command-Line Reference](https://turborepo.org/docs/reference/command-line-reference)

跑单个App，`turbo run dev --filter=app1` **app1是package.json 内的名字**
```shell
turbo run dev --scope='web' --include-dependencies --no-deps
turbo run dev --filter=web
```

删除缓存
```shell
rm -rf .turbo
# 删除所有node_modules
find . -name "node_modules" -type d -exec rm -rf '{}' +
# or script in package
"clear-node_modules": "rm -rf node_modules **/*/ node_modules"
```

## pnpm 

`pnpm dlx replace npx`
```shell
pnpm dlx create-react-app cra-ts --template typescript
```

```shell
# 给一个应用装包
pnpm i --filter "@mf.shared-routing/shell" clsx 
pnpm dlx create-react-app sub-cra-react --template typescript
pnpm dlx @vue/cli create --default sub-vue2  
```

给webpack-react-base安装包
```shell
pnpm i typescript ts-node @types/node @types/webpack webpack webpack-cli @types/webpack-dev-server webpack-dev-server -D  --filter webpack-react-base
```

用 `pnpm` 安装全局共用的包，比如 `react`, `react-dom`。

```shell
pnpm install react react-dom -w
```

`-w` 表示把包安装在 `root` 下，该包会放置在 `<root>/node_modules` 下。当然也可以把把安装在所有  `packages` 中，使用 `-r` 代替 `-w`。必须使用其中一个参数。例如把 `dayjs` 装入 `packages/web` 下，`packages/web` 中的 `package.json` name 为 @`test/web`。需要执行：
```shell
pnpm i dayjs -r --filter @test/web
```
eg: 将`package`中的包安装到`app`下
```shell
pnpm i @package.config/tsconfig -r --filter webpack-react-base -D
```
使用 `--filter` 后面接子 `package` 的 `name` 表示只把安装的新包装入这个 `package` 中。

更新包
```shell
pnpm --recursive update
# 更新子目录深度为 100 以内的所有包
pnpm --recursive update --depth 100
# 将每个包中的 typescript 更新为最新版本
pnpm --recursive update typescript@latest
```

## typescript

```
{
  "compilerOptions": {
    /* 访问 https://aka.ms/tsconfig.json 以阅读有关此文件的更多信息 */

    /* 基本选项 */
    "incremental": true,                   /* 启用增量编译 */
    "target": "ESNEXT",                    /* 指定 ECMAScript 目标版本：'ES3'、'ES5'（默认）、'ES2015'、'ES2016'、'ES2017'、'ES2018'、'ES2019'、'ES2020' 或 'ESNEXT'。 */
    "module": "commonjs",                  /* 指定模块代码生成：“none”、“commonjs”、“amd”、“system”、“umd”、“es2015”、“es2020”或“ESNext”。 */
    "lib": [],                             /* 指定要包含在编译中的库文件。 */
    "allowJs": true,                       /* 允许编译 javascript 文件。 */
    "checkJs": true,                       /* 报告 .js 文件中的错误。 */
    "jsx": "preserve",                     /* 指定 JSX 代码生成：'preserve'、'react-native' 或 'react'。 */
    "declaration": true,                   /* 生成相应的“.d.ts”文件。 */
    "declarationMap": true,                /* 为每个对应的“.d.ts”文件生成一个源映射。 */
    "sourceMap": true,                     /* 生成相应的“.map”文件。 */
    "outFile": "./",                       /* 连接输出到单个文件。 */
    "outDir": "./",                        /* 将输出结构重定向到目录。 */
    "rootDir": "./",                       /* 指定输入文件的根目录。用于通过 --outDir 控制输出目录结构。 */
    "composite": true,                     /* 启用项目编译 */
    "tsBuildInfoFile": "./",               /* 指定文件存放增量编译信息 */
    "removeComments": true,                /* 不要向输出发出注释。 */
    "noEmit": true,                        /* 不发出输出。 */
    "importHelpers": true,                 /* 从 'tslib' 导入发射助手。 */
    "downlevelIteration": true,            /* 以“ES5”或“ES3”为目标时，为“for-of”、展开和解构中的迭代提供全面支持。 */
    "isolatedModules": true,               /* 将每个文件转换为一个单独的模块（类似于 'ts.transpileModule'）。 */


    /* 严格的类型检查选项 */
    "strict": true,                        /* 启用所有严格的类型检查选项。 */
    "noImplicitAny": true,                 /* 使用隐含的“任何”类型在表达式和声明上引发错误。 */
    "strictNullChecks": true,              /* 启用严格的空检查。 */
    "strictFunctionTypes": true,           /* 启用函数类型的严格检查。 */
    "strictBindCallApply": true,           /* 在函数上启用严格的“绑定”、“调用”和“应用”方法。 */
    "strictPropertyInitialization": true,  /* 启用对类中属性初始化的严格检查。 */
    "noImplicitThis": true,                /* 使用隐含的“any”类型在“this”表达式上引发错误。 */
    "alwaysStrict": true,                  /* 以严格模式解析并为每个源文件发出“使用严格”。 */


    /* 额外检查 */
    "noUnusedLocals": true,                /* 报告未使用的本地人的错误。 */
    "noUnusedParameters": true,            /* 报告未使用参数的错误。 */
    "noImplicitReturns": true,             /* 不是函数中的所有代码路径都返回值时报告错误。 */
    "noFallthroughCasesInSwitch": true,    /* 在 switch 语句中报告失败情况的错误。 */


    /* 模块分辨率选项 */
    "moduleResolution": "node",            /* 指定模块解析策略：'node' (Node.js) 或 'classic' (TypeScript pre-1.6)。 */
    "baseUrl": "./",                       /* 解析非绝对模块名称的基目录。 */
    "paths": {},                           /* 一系列将导入重新映射到相对于“baseUrl”的查找位置的条目。 */
    "rootDirs": [],                        /* 根文件夹列表，其组合内容代表运行时项目的结构。 */
    "typeRoots": [],                       /* 包含类型定义的文件夹列表。 */
    "types": [],                           /* 类型声明文件要包含在编译中。 */
    "allowSyntheticDefaultImports": true,  /* 允许从没有默认导出的模块中默认导入。 这不会影响代码发出，只是类型检查。 */
    "esModuleInterop": true,               /* 通过为所有导入创建命名空间对象，在 CommonJS 和 ES 模块之间启用发射互操作性。 暗示“allowSyntheticDefaultImports”。 */
    "preserveSymlinks": true,              /* 不解析符号链接的真实路径。 */
    "allowUmdGlobalAccess": true,          /* 允许从模块访问 UMD 全局变量。 */


    /* 源映射选项 */
    "sourceRoot": "",                      /* 指定调试器应该定位 TypeScript 文件而不是源位置的位置。 */
    "mapRoot": "",                         /* 指定调试器应该定位映射文件而不是生成位置的位置。 */
    "inlineSourceMap": true,               /* 发出带有源映射的单个文件而不是单独的文件。 */
    "inlineSources": true,                 /* 在单个文件中与源映射一起发出源； 需要设置“--inlineSourceMap”或“--sourceMap”。 */


    /* 实验选项 */
    "experimentalDecorators": true,        /* 启用对 ES7 装饰器的实验性支持。 */
    "emitDecoratorMetadata": true,         /* 为装饰器的发射类型元数据启用实验性支持。 */


    /* 高级选项 */
    "skipLibCheck": true,                     /* 跳过声明文件的类型检查。 */
    "forceConsistentCasingInFileNames": true  /* 禁止对同一文件的大小写不一致的引用。 */
  }
}

```

## eslint

The `eslint-config-` prefix can be omitted from the configuration name. For example, airbnb resolves as `eslint-config-airbnb`.

so eslint 的name从 @package.config/eslint-config-custom =》eslint-config-custom

- [Make and Publish Your ESLint Config with pnpm in a Monorepo](https://berkekaragoz.com/p/make-and-publish-eslint-monorepo-config-with-pnpm)
# prettier

```shell
pnpm i prettier -w -D 
```

## error list

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

#### node版本要用node 16
# todo

- [lint-staged](https://github.com/okonet/lint-staged)
- react app eslint, `eslint-config-react-app`包含了基本常用的，单也包含了typescript，看怎么处理
- jest config
- build and try turbo cache
- docker
- git action
