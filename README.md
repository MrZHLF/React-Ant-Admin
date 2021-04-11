### React  + Ant Design 实现后台管理系统

### 区分打包环境配置
- 首先安装 cnpm install -g dotenv-cli
-项目中有 .env.development，.env.production，.env.test 三个配置文件
- 在package.json配置
- "build:dev":  dotenv -e .env.development react-app-rewired build,
- "build:pro":  dotenv -e .env.production react-app-rewired build,
- "build:test":  dotenv -e .env.test react-app-rewired build,


### create-react-app文档 `http://www.html.cn/create-react-app/`