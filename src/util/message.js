export default class Message {
  
  // 根据传入的mark_id和消息比较，获得相同的那条消息
  getMessageIndex(messages, mid) {
    let index = 0;
    messages.find((message, idx) => {
      let mark_id = message.mark_id || message._id;
      if (mark_id === mid) {
        index = idx;
        return true;
      }
    });
    return index;
  }
  isOneself(id, user) {
    return id === user._id;
  }
  message(chatRecord) {
    return Object.assign({
      content: '',
      isSelf: true,
      // 系统消息还是聊天消息 0 聊天消息 1系统消息
      msgType: 0,
      // 已读 1 未读 0
      status: 1,
      // timestamp: Date.now(),
      // createAt: Date.now(),
      isLoad: false,
      /** 
       * 标识该消息的唯一id， _id也是唯一id，不同的是该mark_id可能由本地产生，没有的时候自动被mergeMessage转化为_id
       * 作用在于无论服务器是否接受到数据都能指定该消息为唯一，，有效防止vue对其更新
       * 
      */
      mark_id: '',
      // 消息类型 text/image/file 目前三种类型
      type: 'text',
      // 该消息的唯一id，由服务器产生
      _id: '',
    }, chatRecord)

  }
  // 消息体，房间信息，是否为私聊 对后端传入的数据进行分析并且合并
  mergeMessage(message, room, userInfo ) {

    if(!Object.keys(message).length) return {};

    // message = JSON.parse(JSON.stringify(message));
    let creater = message.creater;
    let isPrivate = room.chatType === 'private';
    // 获取id
    let createrId = creater._id ? creater._id : creater;
    // 比较是否为自己
    let isOneSelf = this.isOneself(createrId, userInfo);
    message.isSelf = isOneSelf;
    // 是否有mark_id标识，没有就用_id指定
    if(!message.mark_id) message.mark_id = message._id;
    // 群聊 直接返回
    if (!isPrivate) {
      return message;
    };
    // 非群聊判断creater是否被合并过 根据是否为自己获取创建消息者信息
    let createrInfo = isOneSelf ? userInfo: room.info;

    if(!creater._id) {
      message.creater = createrInfo;
    }
    return message;
  }
  /**
   * 创建消息
   * content 消息内容
   * creater 消息创建者 Object
   * type 消息类型 text/image/file
   * 
   */
  createMessage({ content, creater, type }) {
    if(!creater) throw new Error('未指定消息创建人')
    // 创建消息
    return this.message({
      creater,
      isSelf: true,
      isLoad: true,
      content,
      type ,
      // 创建临时标示
      mark_id: 'tmp'+ Date.now()
    })
  }
  // 消息体转化
  messageify(message) {
    return {
      
    }
  }
  
}