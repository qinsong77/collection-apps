import * as path from 'path';
import { config as loadConfig } from 'dotenv';

export const ROOT_PATH = path.resolve(__dirname, '../');

export const IS_DEV = process.env.NODE_ENV === 'development';

export const NODE_ENV = process.env.NODE_ENV;

const ENV_CONFIG_PATH = path.resolve(ROOT_PATH, 'env', `${NODE_ENV}.env`);

// node 读取env 配置
loadConfig({
  path: ENV_CONFIG_PATH,
});
