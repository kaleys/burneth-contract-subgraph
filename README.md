# 🔥 BurnETH 合约子图与客户端项目

这个项目包含了一个完整的去中心化应用（DApp），用于与 BurnETH 智能合约交互，包括子图数据索引和前端客户端界面。

## 📁 项目结构

```
├── burneth-subgraph/     # The Graph 协议子图，用于索引合约事件
├── burneth-client/       # React 前端客户端应用
└── README.md            # 项目说明文档
```

## 🎯 项目概述

**BurnETH** 是一个代币燃烧合约，允许用户通过发送 ETH 来燃烧相应数量的代币。这个项目提供了完整的基础设施来与该合约交互和监控燃烧事件。

### 核心功能
- 🔥 **代币燃烧**: 用户可以通过发送 ETH 来燃烧代币
- 📊 **数据索引**: 使用 The Graph 协议索引所有燃烧事件
- 💻 **用户界面**: 提供友好的 React 界面进行交互
- 🔍 **实时监控**: 查看历史燃烧记录和战士数据

## 🌐 网络信息

- **网络**: Sepolia 测试网
- **合约地址**: `0xEE84639018Cb7c29EA725FD2FA8e8c1EBba016Fb`
- **起始区块**: 9034293

## 📊 子图 (burneth-subgraph)

### 功能特点
- 📈 **事件索引**: 自动索引 `Burned` 事件
- 🔗 **GraphQL API**: 提供强大的查询接口
- ⚡ **实时更新**: 实时同步链上数据
- 🎯 **高效查询**: 支持复杂的数据查询和过滤

### 数据模型
```graphql
type Burned @entity(immutable: true) {
  id: Bytes!
  from: Bytes!           # 燃烧者地址
  value: BigInt!         # 燃烧数量
  blockNumber: BigInt!   # 区块号
  blockTimestamp: BigInt! # 时间戳
  transactionHash: Bytes! # 交易哈希
}
```

### 快速开始

#### 安装依赖
```bash
cd burneth-subgraph
npm install
```

#### 本地开发
```bash
# 生成代码
npm run codegen

# 构建子图
npm run build

# 部署到 Graph Studio
npm run deploy
```

#### 本地节点部署
```bash
# 创建本地子图
npm run create-local

# 部署到本地节点
npm run deploy-local
```

## 💻 客户端应用 (burneth-client)

### 功能特点
- 🦊 **MetaMask 集成**: 无缝钱包连接体验
- 🔥 **燃烧操作**: 直观的代币燃烧界面
- 📊 **数据展示**: 显示燃烧历史和统计信息
- 🎨 **现代设计**: 使用 Material-UI 的美观界面
- ⚡ **实时查询**: Apollo Client 集成子图数据

### 技术栈
- **前端框架**: React 18 + TypeScript
- **UI 库**: Material-UI (MUI)
- **区块链交互**: ethers.js v5
- **GraphQL 客户端**: Apollo Client
- **状态管理**: React Hooks

### 快速开始

#### 安装依赖
```bash
cd burneth-client
npm install
```

#### 启动开发服务器
```bash
npm start
```

应用将在 `http://localhost:3000` 运行。

#### 构建生产版本
```bash
npm run build
```

### 使用说明

1. **连接钱包**
   - 点击"连接 MetaMask"按钮
   - 确保切换到 Sepolia 测试网

2. **燃烧代币**
   - 输入要燃烧的 ETH 数量
   - 点击"燃烧"按钮确认交易
   - 等待交易确认

3. **查看数据**
   - 浏览燃烧历史记录
   - 查看战士数据统计

## 🛠 开发指南

### 环境要求
- Node.js 16+
- npm 或 yarn
- MetaMask 浏览器插件
- Sepolia 测试网 ETH

### 合约交互
客户端通过以下方式与合约交互：
```typescript
// 燃烧代币
const tx = await contract.burn({ value: ethers.utils.parseEther(amount) });
```

### GraphQL 查询示例
```graphql
query GetBurnedTokens($first: Int!, $skip: Int!) {
  burneds(
    first: $first
    skip: $skip
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    from
    value
    blockNumber
    blockTimestamp
    transactionHash
  }
}
```

## 📋 脚本命令

### 子图命令
```bash
npm run codegen    # 生成 TypeScript 类型
npm run build      # 构建子图
npm run deploy     # 部署到 Graph Studio
npm run test       # 运行测试
```

### 客户端命令
```bash
npm start          # 启动开发服务器
npm run build      # 构建生产版本
npm test           # 运行测试
npm run eject      # 弹出配置（不推荐）
```

## 🔒 安全说明

- ⚠️ **测试网专用**: 该项目部署在 Sepolia 测试网，仅用于测试目的
- 🔐 **私钥安全**: 永远不要在代码中硬编码私钥或助记词
- 🛡️ **合约审计**: 生产环境部署前请进行充分的安全审计
- 💰 **资金风险**: 使用测试网代币，不涉及真实资金

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

该项目使用 UNLICENSED 许可证。

## 🔗 相关链接

- [The Graph 协议](https://thegraph.com/)
- [Sepolia 测试网](https://sepolia.dev/)
- [MetaMask 钱包](https://metamask.io/)
- [Material-UI 文档](https://mui.com/)
- [ethers.js 文档](https://docs.ethers.org/)

## 📞 联系方式

如有问题或建议，请创建 Issue 或联系项目维护者。

---

**⚡ 快速体验**: 安装 MetaMask → 获取 Sepolia ETH → 连接钱包 → 开始燃烧！