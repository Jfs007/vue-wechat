export default class Message {
  

  getMessageIndex(messages, _id, chatType) {
    let index = 0;
    messages.find((message, idx) => {
      console.log(message._id, _id, 'message,,,,', message.chatType, chatType)
      if (message.chatType === chatType && message._id === _id) {
        console.log(message._id, _id)
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
      _id: 'temp'+ Date.now()
    }, chatRecord)
  }
  // 消息体，房间信息，是否为私聊
  mergeMessage(message, room, userInfo, isPrivate = true ) {
    // 不是私聊的情况
    if(!isPrivate) {
      let isOneself = this.isOneself(message.creater._id, userInfo);
      message.isSelf = isOneself;
      return this.message(message);
    }
    let isOneself = this.isOneself(message.creater, userInfo);
    if(isOneself) {
      message = this.message({
        // 消息体
        ...message,
        isSelf: true,
        creater: userInfo,
        
      });
      return message;
    }
    if(!isOneself) {
      message = this.message({
        // 消息体
        ...message,
        isSelf: false,
        creater: room.info,
       
      });
      return message
    }
  
  }
  // 消息体转化
  messageify(message) {
    return {
      
    }
  }
  
}