## server
- 初始化：npm init -y
- 安装依赖：npm i express mongoose nodemon socket.io bcrypt cors dotenv
- server根目录新建index.js,package中增加启动脚本命令
```
  "scripts": {
    "start": "nodemon index.js",
  },
```
- 根目录创建文件.env
```
PORT=5000
MONGO_URL="mongodb://localhost:27017/chat"
```

## app
- 初始化：npx create-react-app chat-app
