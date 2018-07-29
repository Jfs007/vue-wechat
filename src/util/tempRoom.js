export default class tempRoom {
 //  
 constructor(tempRoom) {
  this.tempRoom = tempRoom || [];
  this.currRoomIndex = 0;
 }
 tempRoomisExit(info) {
  let tempRoom = this.tempRoom;
  let currRoomIdx = -1;
  let {chatType, id} = info;
  tempRoom.find((theroom, index) => {
    if (theroom.id === id&& theroom.chatType === chatType ) {
      currRoomIdx = index;
      this.currRoomIndex = index;
      return true;
    }
  });
   return currRoomIdx;
 }
 // 是否为当前房间
 isCurrentRoom(info, currRoom) {
   let { chatType, id} = info;
   return currRoom.chatType === chatType && currRoom.id === id;
 }
 room(option) {
  let defaultRoom = {
    chatType: 'private',
    // 未读
    unread: 0,
    chatRecords: [],
    id: null,
    // 房间是否为新的房间
    isNewRoom: true,
    // 房间信息
    info: null,
    // 房间是否激活 (是否进行过聊天 false表示已创建但未聊过天 )
    isActive: false,
    // 未读的那条消息的时间
    lastUnReadMessage: Date.now()
  };
  return Object.assign(defaultRoom, option)
 }
 /**
  * 房间
  * 
  * notRead: 临时聊天表
  * 
  * 
  * 
  * 
  */
 createRoom(info) {
  let currRoom = this.room({
     chatType: info.chatType,
     id: info.id,
     info: info.info,
     isActive: info.isActive,
     account: info.account
  });
  return currRoom;
 }
 

}
/**
 * 
 * 创建房间 -> 判断房间是否存在 
 * true 存在直接拿来使用
 * false 合并两个人的信息为房间 拉取消息记录
 * 
 * 
 * 
 * 切换房间就是设置当前房间
 * 
 * 
 * 消息来得时候，，判断是否为当前房间 
 * true 更新房间消息记录 并且判断滚动是否在最底层 不在更新未读消息
 * false 查找房间
 * true 更新房间消息记录 ，并且未读+1
 * false 什么也不做
 * 
 * 
 * 一个房间结构
 * 
 * {
 *  type 房间类型 (群聊/私聊)
 *  room 如果房间类型为群聊则有 群聊房间信息
 *  fromUser 私聊的时候有 发送人
 *  User 私聊的时候有 接收人就是自己
 *  charRecord 聊天记录
 *  unread 消息未读
 * }
 * 
 */