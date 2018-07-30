export default class Message {
  execMessage({ chatRecords, userInfo, chaterId }) {
    let message = [];
    for (let index = chatRecords.length-1; index>= 0; index--) {
      let chatRecord = chatRecords[index];
      let isSelf = chaterId !== chatRecord.creater;
      message.push(
        this.message(Object.assign(chatRecord, {
          nickname: (isSelf ? userInfo : chatRecord.friend).nickname,
          avatar: (isSelf ? userInfo : chatRecord.friend).avatar,
          content: chatRecord.content,
          isSelf,
          timestamp: chatRecord.timestamp,
          id: (isSelf ? userInfo : chatRecord.friend).id || (isSelf ? userInfo : chatRecord.friend)._id,
          account: (isSelf ? userInfo : chatRecord.friend).account
        }))
      )
    };
    return message;
  }
  isOneself(chat, user) {
    return chat.creater === user._id;
  }
  message(chatRecord) {

    return Object.assign({
      nickname: '',
      avatar: '',
      content: '',
      isSelf: true,
      // 系统消息还是聊天消息 0 聊天消息 1系统消息
      msgType: 0,
      // 已读 1 未读 0
      status: 1,
      timestamp: Date.now(),
      createAt: Date.now()
    }, chatRecord)
  }
  // 消息体，房间信息，是否为私聊
  mergeMessage(message, room, userInfo, isPrivate = true ) {
    
    // 
    if(isPrivate) {
      let isOneself = this.isOneself(message, userInfo);
      if(isOneself) {
        return this.message({
          isSelf: true,
          avatar: userInfo.avatar,
          account: userInfo.account,
          ownerId: userInfo._id,
          // 消息体
          ...message
        })
      }
      if(!isOneself) {
        return this.message({
          isSelf: true,
          avatar: room.info.avatar,
          account: room.info.account,
          ownerId: room.info._id,
          // 消息体
          ...message
        })
      }
    }
  }
  
}