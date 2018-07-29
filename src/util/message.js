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
}