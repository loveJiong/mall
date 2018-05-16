# 项目简介

> 传统电商app

## 技术栈

> vue2 + vuex + vue-router + webpack + ES6 + sass + flex

## 项目运行
```
git clone https://github.com/loveJiong/mall.git

cd mall

npm install

npm run dev
```

## 说明
服务端还在开发中，目前数据和交互都还未实现

## 目标功能
- [x] 登录 -- 完成
- [x] 我的商家(首页) -- 完成
- [x] 添加商家 -- 完成
- [x] 产品图册-- 完成
- [x] 产品类别 -- 完成
- [x] 购物车 -- 完成
- [x] 订单管理 -- 完成
- [x] 我的 -- 完成
- [x] 我的收货地址 -- 完成
- [x] 添加收货地址 -- 完成
- [x] 单个系列详情页面 -- 完成
- [x] 搜索商品 -- 完成

# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── addAddress                          // 添加地址
│   │   ├── addCompany                          // 添加商家
│   │   ├── footGuide                           // 底部导航
│   │   ├── groupDetail                         // 系列详情
│   │   ├── home                                // 首页
│   │   ├── mine                                // 我的
│   │   ├── myAddress                           // 我的地址
│   │   ├── orderManagement                     // 订单管理
│   │   ├── productPictures                     // 产品图册
│   │   ├── shoppingCart                        // 购物车
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── config.scss                         // 样式配置文件
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
│   ├── mock.js                                 // 模拟服务器响应（只模拟了一个）
├── static                                      // 静态文件目录
├── index.html                                  // 入口html文件