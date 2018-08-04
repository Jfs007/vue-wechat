# 前言


----------

项目使用了vue框架实现的一个模仿手机qq的项目，此前涉及了注册、登录、退出、查找添加好友、好友聊天、编辑用户的一个流程，项目的ui则选用了滴滴的cube-ui，啥为啥使用这个，单纯只是因为想玩玩这个ui而已，并且它内置了better-scroll非常符合我这个项目，这个项目权当测试瞎搞，大佬们轻喷(づ￣-￣)づ

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 +axios + stylus + flex + socket.io

## 前端项目运行

#### 

```
git clone https://github.com/Jfs007/vue-wechat  

cd vue-wechat

npm install  

npm run dev
```
## 另外(这很重要)
请忽略master 分支 吧 ！！
此项目有配套的后台系统，如果想体验前后台同时开发，可以下载对应的后台系统：[后台项目传送地址](https://github.com/Jfs007/chat-server)。

# 说明


>  开发环境 macOS 10.13.1  Chrome 67.0.3396.99  nodejs v8.4.0



# 效果

# 目标功能
- [x] 注册-- 完成
- [x] 登录 -- 完成
- [x] 登出 -- 完成
- [x] 搜索好友 -- 完成
- [x] 添加好友 -- 完成
- [x] 好友聊天 -- 完成
- [x] 查看好友 -- 完成
- [x] 好友列表-- 完成
- [x] 好友请求列表-- 完成
- [x] 好友消息列表 -- 完成
- [x] 编辑好友 -- 完成
- [ ] 群聊 -- 完成( 起头 )
- [ ] 空间 -- 完成




# 部分截图


### 登录页面
![](https://github.com/Jfs007/vue-wechat/blob/master/screenshots/login.jpg)
### 聊天
![](https://github.com/Jfs007/vue-wechat/blob/master/screenshots/chat.png)






# 项目布局

```
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── api
│   │   ├── axios.js
│   │   └── index.js
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── bt-tab.vue
│   │   ├── chat-message-box.vue
│   │   ├── dot.vue
│   │   ├── hd-bar.vue
│   │   ├── linkman
│   │   │   └── friend.vue
│   │   ├── message-input-bar.vue
│   │   ├── page-view.vue
│   │   ├── progressBar.vue
│   │   ├── q-field.vue
│   │   ├── q-input.vue
│   │   ├── q-item.vue
│   │   ├── q-list.vue
│   │   ├── request-list.vue
│   │   ├── slide-bar.vue
│   │   └── tempRoom.vue
│   ├── conf
│   │   ├── chat-conf.js
│   │   └── gd-conf.js
│   ├── images
│   │   ├── login.jpg
│   │   ├── login1.jpg
│   │   ├── login2.jpg
│   │   ├── login3.jpg
│   │   ├── login4.jpg
│   │   └── touxiang.jpg
│   ├── main.js
│   ├── page
│   │   ├── account
│   │   │   ├── accountmanage.vue
│   │   │   └── setting.vue
│   │   ├── index.vue
│   │   ├── linkman
│   │   │   ├── addfriend.vue
│   │   │   ├── allrequest.vue
│   │   │   ├── edituser
│   │   │   │   ├── avatar.vue
│   │   │   │   ├── birthday.vue
│   │   │   │   └── index.vue
│   │   │   ├── friendrequest
│   │   │   │   ├── friendset.vue
│   │   │   │   └── index.vue
│   │   │   ├── index.vue
│   │   │   ├── newfriend.vue
│   │   │   ├── searchuser.vue
│   │   │   └── usercard
│   │   │       ├── friendadd.vue
│   │   │       └── index.vue
│   │   ├── login.vue
│   │   ├── messages
│   │   │   ├── chat.vue
│   │   │   └── index.vue
│   │   ├── register
│   │   │   ├── index.vue
│   │   │   ├── register-nickname.vue
│   │   │   ├── register-password.vue
│   │   │   ├── register-success.vue
│   │   │   └── store
│   │   │       ├── actions.js
│   │   │       ├── index.js
│   │   │       ├── mutations.js
│   │   │       └── state.js
│   │   └── search.vue
│   ├── router
│   │   ├── auth.js
│   │   └── index.js
│   ├── socket
│   │   └── socket.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   │       ├── system
│   │       │   ├── actions.js
│   │       │   ├── index.js
│   │       │   ├── mutations.js
│   │       │   └── state.js
│   │       ├── tempRoom
│   │       │   └── index.js
│   │       └── user
│   │           ├── actions.js
│   │           ├── index.js
│   │           ├── mutations.js
│   │           └── state.js
│   ├── style
│   │   ├── _help.styl
│   │   ├── animate.css
│   │   ├── common.styl
│   │   ├── frozenui.css
│   │   ├── iconfont.css
│   │   └── reset.styl
│   └── util
│       ├── browser.js
│       ├── dom.js
│       ├── friendRequest.js
│       ├── message.js
│       ├── misc.js
│       ├── rem.js
│       └── tempRoom.js
├── static
└── test
    ├── e2e
    │   ├── custom-assertions
    │   │   └── elementCount.js
    │   ├── nightwatch.conf.js
    │   ├── runner.js
    │   └── specs
    │       └── test.js
    └── unit
        └── specs
            └── HelloWorld.spec.js

```


# License

[GPL](https://github.com/bailicangdu/vue2-elm/blob/master/COPYING)