/**
 * 
 * 后端数据的好友请求处理
 * 
 */

export default class friendRequest{
  originType(origin) {
    return origin === 0 ? '来自搜索添加' : '来自群添加'
  }
  request(req) {
    let {origin} = req;
    // 暂时处理
    origin = this.originType(origin);
    return Object.assign({
      nickname: '',
      avatar: '',
      userid: null,
      id: null,
      // 接受状态 
      acceptStatus: 0,
      // 是否为好友的请求
      isFriendReq: false,
      authInfo: '',
      origin
    }, req)
  }
  initRequest(info) {
    let { account, req } = info;
    let isFriendReq = req.addPeople.account === account;
    let requestUser = isFriendReq ? req.creater : req.addPeople;
    return this.request({
      authInfo: req.authInfo,
      origin: req.origin,
      nickname: requestUser.nickname,
      avatar: requestUser.avatar,
      userid: requestUser._id,
      id: req._id,
      acceptStatus: req.acceptStatus,
      account: requestUser.account,
      isFriendReq,
      createdAt: req.createdAt
    });
  }

}