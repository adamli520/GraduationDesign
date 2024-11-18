const ejs = require('ejs');
const path = require('path');

module.exports.render = (filePath, args) => {
    if (!filePath || filePath === '') {
        console.log('请填写路径');
        return false;
    }

    try {
        const absolutePath = path.resolve(__dirname, filePath);
        return ejs.renderFile(absolutePath, args);
    } catch (error) {
        console.error('渲染HTML文件出错:', error);
        return false;
    }
};

module.exports.generateCode = (codeLength) => {
    let code = '';
    const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < codeLength; i++) {
        const index = Math.floor(Math.random() * 10);
        code += random[index];
    }
    return code;
};

