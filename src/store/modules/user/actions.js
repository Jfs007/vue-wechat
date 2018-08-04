import { socketEmit } from '@/socket/socket'
import browser from '@/util/browser.js';
import TempRoom from '@/util/tempRoom.js'
import Message from '@/util/message.js';
import { fileUpload } from '@/api/upload' 
let message = new Message();

export default {
  // 关于用户

  // 上线
  async online({ commit, state, dispatch }) {
    if (state.isOnLine) return;
    try {
      // 上线
      let userInfo = await socketEmit('online', { device: browser.versions });
      commit('setOnline', true);
      commit('initUserInfo', userInfo.data);
      // 未读的私聊
      dispatch('getUnReadPrivate');
      // 好友列表
      dispatch('initFriendList')
      // 获得群房间列表
      dispatch('initRoomList');
      // 获取好友请求列表
      await dispatch('initRequestList');
      // 初始化完请求列表后设置未读( 只需要上线的时候设置就好了 )
      commit('initUnReadrequest');
      // 获取临时请求列表
    } catch (error) {
      
    }
  },

  // 刷新用户资料
  async freshUserInfo({state, commit}) {
    let userInfo = await socketEmit('getUserInfo', { id: state.userInfo._id });
    commit('initUserInfo', userInfo.data.user);
  },
  async offline({state, commit}) {
    try {
      await socketEmit('offline');
      commit('setOnline', false);
      commit('initUserInfo', []);
      localStorage.removeItem('_token');
      return 
    } catch (error) {
      return error
    }
    
  },
  async updateUser({state, dispatch}) {
    let forms = state.editForms;
    await socketEmit('updateUser', forms);
    dispatch('freshUserInfo')
  },

  async initRoomList({commit}) {
    let rooms = await socketEmit('getRoomList');
    rooms = rooms.data.rooms;
    commit('initRoomList', rooms);
  },









  // 好友/请求部分 -----------

  async addFriend({commit, dispatch}, info) {
    let {to, authInfo, remark, origin } = info;
    await socketEmit('addFriend', {
      to,
      authInfo,
      remark,
      origin
    });
    dispatch('initRequestList');
  },
  // 设置好友请求列表
  async initRequestList({commit}) {
    let requestList = await socketEmit('getFriendRequest');
    // 初始化好友请求列表
    commit('initRequestList', requestList.data.request_list);
  },
  async initFriendList({ commit }) {
    try {
      let friendList = await socketEmit('getFriendList');

      commit('initFriendList', friendList.data);
    } catch (error) {
      console.notice(error)
    }
  },









  // 上线后构造有未读消息房间
  async getUnReadPrivate({commit, state, dispatch}) {
    try {
      let res = await socketEmit('getUnReadPrivate');
      let unReadPrivate = res.data;
      let roomToMessage = {};
      unReadPrivate.map((info) => {
        ([info.creater] in roomToMessage) || (roomToMessage[info.creater] = 0);
        roomToMessage[info.creater]++;
      });
      for(let id in roomToMessage) {
        // 创建私聊
        let room = await dispatch('createrPrivateRoom', { isActive: true, id });
        // 创建房间
        // 获取聊天记录
        let chatRecords = await socketEmit('getPrivateMsg', {
          to: id,
          // 未读
          limit: roomToMessage[id]
        });
        let firstChat = chatRecords.data[0];
        room.lastUnReadMessage = firstChat.timestamp;
        room.chatRecords = chatRecords.data;
        room.unread = roomToMessage[id];
        commit('createRoom', room);
      }
    } catch (error) {
      
    }
  },
  
  // 读消息
  async readPrivateMessage({commit, state}, roomIndex) {
    try {
      let room = state.tempRoomList[roomIndex];
      await socketEmit('readPrivateMsg', { to: room.id })
      commit('readRoomMessage', roomIndex);
      // 发送读取
    } catch (error) {
      
    }
  },

  // 新的私聊消息
  async newPrivateMessage({commit, state, dispatch}, info) {
    let { creater } = info;
    let tempRoom = new TempRoom(state.tempRoomList);
    let index = tempRoom.tempRoomisExit({ chatType: 'private', id: creater });

    if(index<0) {
      index = 0;
      
      let room = await dispatch('createrPrivateRoom', {isActive: true, id: creater});
      
      // 记录最开始未读的那条消息时间
      room.lastUnReadMessage = Date.now();
      // 创建房间
      commit('createRoom', room);
      // 
      commit('addChatRecords', {
        index,
        chatRecord: info
      });

    }else {
      // 提前房间消息 
      commit('addChatRecords', {
        index,
        chatRecord: info
      });
      // 更新房间信息
      let roomInfo = await socketEmit('getPrivateRoomInfo', { id: creater });
      let room = state.tempRoomList[index];
      if(room.unread <=0) {
        // 记录最开始未读的那条消息时间
        room.lastUnReadMessage = Date.now();
      }
      room.info = { ...roomInfo.data.friend, remarkname: roomInfo.data.remarkname };
    }
    
    // 增加未读
    commit('addUnRead', index);
  },

  async newRoomMessage({ commit, state, dispatch }, info) {
    let { roomid } = info;
    let tempRoom = new TempRoom(state.tempRoomList);
    let index = tempRoom.tempRoomisExit({ chatType: 'group', id: roomid });
    if (index < 0) {
      index = 0;
      let room = await dispatch('createrRoom', { isActive: true, id: roomid });
      // 记录最开始未读的那条消息时间
      room.lastUnReadMessage = Date.now();
      // 创建房间
      commit('createRoom', room);
      // 
      commit('addChatRecords', {
        index,
        chatRecord: info
      });

    } else {
      
      // 提前房间消息 
      commit('addChatRecords', {
        index,
        chatRecord: info
      });
      // 更新房间信息
      let roomInfo = await socketEmit('getRoomInfo', { roomid: roomid });
      let room = state.tempRoomList[index];
      if (room.unread <= 0) {
        // 记录最开始未读的那条消息时间
        room.lastUnReadMessage = Date.now();
      }
      room.info = roomInfo.data;
    }

    // 增加未读
    commit('addUnRead', index);
  },

  // 改变房间
  async changeRoom({commit, state, dispatch}, info) {
    // 房间id 
    let { chatType, id } = info;
    let tempRoom = new TempRoom(state.tempRoomList);
    let index = tempRoom.tempRoomisExit({chatType, id});
    // 如果房间存在
    if(index>=0) {
      commit('changeRoom', index);
      return;
    }
    let room = null;
    if (chatType === 'private') {
      room = await dispatch('createrPrivateRoom', {id});
      // 创建房间
    };
    if (chatType === 'group') {
      room = await dispatch('createrRoom', { id });
      
      // 
    }
    commit('createRoom', room);
    commit('changeRoom', 0);
  },
  async createrRoom({commit}, {id, isActive}) {
    let roomInfo = await socketEmit('getRoomInfo', {roomid: id});
    let tempRoom = new TempRoom();
    let room = tempRoom.createRoom({ chatType: 'group', isActive, id });
    room.info = roomInfo.data ;
    return room;
  },
  /**
   * 拉取私聊房间信息
   * @param {*} param0 
   * @param {*} param1 
   * 返回房间对象
   * 
   */
  async createrPrivateRoom({commit, state, dispatch}, {id, isActive }) {
    // 房间信息
    let roomInfo = await socketEmit('getPrivateRoomInfo', {id});
    let tempRoom = new TempRoom();
    let room = tempRoom.createRoom({ chatType: 'private', isActive, id });
    room.info = { ...roomInfo.data.friend, remarkname: roomInfo.data.remarkname };
    return room;
  },
  // 添加房间私聊聊天记录
  async getPrivate({ commit, state }, info) {
    let { id, limit } = info;
    limit = limit || 10;
    let chatRecords = await socketEmit('getPrivateMsg', {
      to: id,
      // 默认获取10条
      limit
    });
    return chatRecords.data;
  },
  /**
   * 
   * @param {*} param0 
   * 
   * fileObj 经过 Upload.js包装过的文件对象  见@/util/upload
   * createCallback 创建完消息的回调
   */
  async sendFile({ commit, state, dispatch }, { fileObj, type, chatType, creater, createCallback }) {
    let room = state.tempRoomList[state.currRoomIndex];
    let isActive = room.isActive;
    // 房间是否已被激活
    if (!isActive) {
      commit('activeRoom', state.currRoomIndex);
    }
    creater = creater || state.userInfo;
    // 创建一条指定type的空消息
    let msg = message.createMessage({ isLoad: true, type, creater });
    let dataURL = await fileObj.getDataURL();
    if(type === 'image') {
      msg.content = dataURL;
    }
    if(type === 'file') {

      msg.content = '';
    }
    // 创建出消息的临时id
    let temp_id = msg.mark_id;
    commit('addChatRecords', {
      index: state.currRoomIndex,
      chatRecord: msg
    });
    createCallback && createCallback();
    let preFile = await fileObj.uploadPre(type, dataURL);
    let fileUrlRet = await fileUpload(preFile);
    let fileUrl = fileUrlRet.data.src+ '?d='+ Date.now();
    if (room.chatType === 'private') {
      msg = await socketEmit('privateMessage', {
        // 聊天内容
        content: fileUrl,
        // 聊天房间id
        to: room.id,
        type
      });
    }
    if (room.chatType === 'group') {
      msg = await socketEmit('roomMessage', {
        // 聊天内容
        content: fileUrl,
        // 聊天房间id
        roomid: room.id,
        type
      });
    };
    msg.data.content = fileUrl;
    commit('coversChatRecord', { info: msg.data, temp_id });
    // let msg = message.message({ isLoad: true, type })
  },

  
  // 发送文本消息
  async sendTextMessage({ commit, state, dispatch }, { content, creater, type, createCallback }) {
    let room = state.tempRoomList[state.currRoomIndex];
    let isActive = room.isActive;
    // 房间是否已被激活
    if (!isActive) {
      commit('activeRoom', state.currRoomIndex);
    }
    creater = creater || state.userInfo;
    let msg = message.createMessage(
      {
        content,
        creater,
        type: 'text'
      }
    );
    // 添加聊天记录
    commit('addChatRecords', {
      index: state.currRoomIndex,
      chatRecord: msg
    });
    createCallback && createCallback()
    // 创建出消息的临时id
    let temp_id = msg.mark_id;
    if(room.chatType === 'private') {
      msg = await socketEmit('privateMessage', {
        // 聊天内容
        content: msg.content,
        // 聊天房间id
        to: room.id
      });
    }
    if(room.chatType === 'group') {
      msg = await socketEmit('roomMessage', {
        // 聊天内容
        content: msg.content,
        // 聊天房间id
        roomid: room.id,
      });
    };
    commit('coversChatRecord', { info: msg.data, temp_id });

  },
  // 发送私聊消息
  
};


