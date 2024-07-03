const fs = require('fs').promises;
const path = require('path');

module.exports = function myAliasPlugin({ keyName = '@' }) {
  return ({
    name: 'my-alias-plugin',
    config: async (config, { mode, command }) => {
      // console.log('config', config, '---', mode, command);
      const { dirs } = await getTargetDir();
      const alias = getMapAlias(dirs, keyName)
      return {
        resolve: {
          alias
        }
      };
    }
  });
};

// 获取当前目录
async function getTargetDir() {
  // 获取当前目录
  const currentDir = path.resolve(__dirname, "../src");

  // 存储结果的对象
  const result = { files: [], dirs: [] };

  try {
    // 读取当前目录的内容
    const items = await fs.readdir(currentDir);

    // 遍历文件和文件夹
    await Promise.all(items.map(async item => {
      // 获取文件的完整路径
      const itemPath = path.join(currentDir, item);

      // 检查路径是否为文件夹
      const stats = await fs.stat(itemPath);
      if (stats.isDirectory()) {
        result.dirs.push(item);
      } else if (stats.isFile()) {
        result.files.push(item);
      }
    }));

    return result;
  } catch (err) {
    console.error('Unable to scan directory: ' + err);
    return [];
  }
}

function getMapAlias(dirs, keyName) {
  const alias = {};
  dirs.forEach(dir => {
    const key = `${keyName}${dir}`;
    const aliasPath = path.resolve(__dirname, `../src/${dir}`);
    alias[key] = aliasPath;
  })
  console.log('alias', alias);
  return alias;
}