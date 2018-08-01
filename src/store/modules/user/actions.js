import { socketEmit } from '@/socket/socket'
import browser from '@/util/browser.js';
import TempRoom from '@/util/tempRoom.js'
import Message from '@/util/message.js';
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
      dispatch('getUnReadPrivate')
      // 获取好友请求列表
      await dispatch('initRequestList');
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
    await socketEmit('offline');
    commit('setOnline', false);
    commit('initUserInfo', []);
    localStorage.removeItem('_token');
    return;
  },
  async updateUser({state, dispatch}) {
    let forms = state.editForms;
    await socketEmit('updateUser', forms);
    dispatch('freshUserInfo')
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
        console.log(firstChat, 'firstChat');
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
      await socketEmit('readMsg', { to: room.id })
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
      let room = await dispatch('createrPrivateRoom', {isActive: true, id: creater});
      // 记录最开始未读的那条消息时间
      room.lastUnReadMessage = Date.now();
      // 创建房间
      commit('createRoom', room);

    }else {
      // 更新房间信息
      let roomInfo = await socketEmit('getPrivateRoomInfo', { id });
      let room = state.tempRoomList[index];
      if(room.unread <=0) {
        // 记录最开始未读的那条消息时间
        room.lastUnReadMessage = Date.now();
      }
      room.info = roomInfo;
    }
    commit('addChatRecords', {
      index,
      chatRecord: info
    });
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
    if (chatType === 'private') {
      let room = await dispatch('createrPrivateRoom', {id});
      // 创建房间
      commit('createRoom', room);
      commit('changeRoom', 0);
    };
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
    room.info = roomInfo.data;
    return room;
  },
  // 添加房间私聊聊天记录
  async getPrivate({commit, state}, info) {
    let { id, limit } = info;
    limit = limit || 10;
    let chatRecords = await socketEmit('getPrivateMsg', {
      to: id,
      // 默认获取10条
      limit
    });
    return chatRecords.data;
  },

  // 发送私聊消息
  async sendPrivate({commit, state, dispatch}, info) {
    let msg = message.message({ ...info, isLoad: true, chatType: 'private' });
    // 添加聊天记录
    commit('addChatRecords', {
      index: state.currRoomIndex,
      chatRecord: msg
    });
    let room = state.tempRoomList[state.currRoomIndex];
    let temp_id = msg._id;
    msg = await socketEmit('privateMessage', {
      // 聊天内容
      content: msg.content,
      // 聊天房间id
      to: room.id,
      // 聊天类型
      type: 'private'
    });
    commit('coversChatRecord', { info: msg.data, temp_id, chatType: 'private' });
  }
  
};


