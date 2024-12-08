const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 安全地处理文件路径
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // 防止目录遍历攻击
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    // 获取文件扩展名
    const extname = path.extname(filePath);

    // 设置内容类型
    const contentType = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp'
    }[extname] || 'application/octet-stream';

    // 读取文件
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // 文件未找到
                fs.readFile(path.join(__dirname, 'index.html'), (indexError, indexContent) => {
                    if (indexError) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(indexContent);
                    }
                });
            } else {
                // 服务器错误
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server error: ' + error.code);
            }
        } else {
            // 成功读取文件
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

// 处理未捕获的异常，防止服务器崩溃
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// 优雅地处理服务器关闭
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
