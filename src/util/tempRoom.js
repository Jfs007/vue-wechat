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
   return currRoom.chatType === chatType && currRoom.id == id;
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
    info: {},
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
     info: info.info || {},
     isActive: info.isActive,
     account: info.account
  });
  return currRoom;
 }
 

}
/**
 * 
 * 
 * // 房间结构
 * 
 * 
 * {
 * roomType: 房间类型
 * fromInfo: {
 *  id: 房间id,
 *  // 房间的一些信息
 *  ...infos
 *  
 * },
 * chatRecords: 房间聊天记录,
 * isActive: 房间是否激活(不激活不会被显示)
 * unread: 房间未读消息数
 * 
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */