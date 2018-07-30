import { socketEmit } from '@/socket/socket'
import browser from '@/util/browser.js';
import TempRoom from '@/util/tempRoom.js'
import Message from '@/util/message.js';
let message = new Message();

export default {
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
  async offline({state, commit}) {
    await socketEmit('offline');
    commit('setOnline', false);
    commit('initUserInfo', []);
    localStorage.removeItem('_token');
    return;
  },
  async updateUser({state}) {
    let forms = state.editForms;
    let userInfo = await socketEmit('updateUser', forms);
  },
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
        let tempRoom = new TempRoom();
        let room = tempRoom.createRoom({ chatType: 'private', id, isActive: true });
        try {
          // 根据发送者拉取房间信息
          let privateRoomInfo = await socketEmit('getPrivateRoomInfo', { id });
          // console.log()
          room.info = privateRoomInfo.data;
          // 创建房间
          // 获取聊天记录
          let chatRecords = await socketEmit('getPrivateMsg', {
            to: id,
            limit: roomToMessage[id]
          });
          // 处理聊天记录
          chatRecords = message.execMessage(
            {
              // 聊天记录
              chatRecords: chatRecords.data,
              // 当前用户
              userInfo: state.userInfo,
              // 发送者
              chaterId: id
            });
          room.chatRecords = chatRecords;
          let lastUnRead = chatRecords[roomToMessage[id]-1];
          let lastUnReadMessage = Number(new Date(lastUnRead));
          room.unread = roomToMessage[id];
          room.lastUnReadMessage = lastUnReadMessage;
          commit('createRoom', room);
        } catch (error) {

        }
      }
    } catch (error) {
      
    }
  },

  async readPrivateMessage({commit, state}, roomIndex) {
    try {
      let room = state.tempRoomList[roomIndex];
      await socketEmit('readMsg', { to: room.id })
      commit('readRoomMessage', roomIndex);
      // 发送读取
    } catch (error) {
      
    }
  },
  
  // 接受到新的私聊消息的时候 更新房间信息
  async getNewPrivateMessage({commit, state}, info) {
    // 
    let tempRoom = new TempRoom(state.tempRoomList);
    let roomIndex = tempRoom.tempRoomisExit({ chatType: 'private', id: info.creater });
    let room = null;
    // 收到别人的消息的时候检查客户端是否存在该临时聊天
    // <0 表示不存在
    if (roomIndex<0) {
      // 创建房间
      // info.creater 消息创建者，，，就是发送者 创建一个某人发送的私聊房间
      room = tempRoom.createRoom({ chatType: 'private', id: info.creater, isActive: true});
      // 新建房间的index
      roomIndex = 0;
      try {
        // 根据发送者拉取房间信息
        let privateRoomInfo= await socketEmit('getPrivateRoomInfo', { id: info.creater });
        // console.log()
        room.info = privateRoomInfo.data;
        // 创建房间
        // console.log()
        commit('createRoom', room);
        // 获取聊天记录
        let chatRecords = await socketEmit('getPrivateMsg', {
          to: info.creater,
          limit: 10
        });
        // 处理聊天记录
        chatRecords = message.execMessage(
          { 
            // 聊天记录
            chatRecords: chatRecords.data, 
            // 当前用户
            userInfo: state.userInfo, 
            // 发送者
            chaterId: info.user
        })
        // 设置聊天记录
        commit('setChatRecords', {
          index: roomIndex,
          chatRecords
        })
      } catch (error) {
        
      }
    }else {
      room = state.tempRoomList[roomIndex];
      // 在对应房间 添加聊天记录
      commit('addChatRecords', {
        index: roomIndex,
        // isSelf false 来自他人的聊天记录 
        chatRecord: message.message(Object.assign(room.info, info, { isSelf: false }))
      });
    };
    // 增加未读
    commit('addUnRead', roomIndex);
  },



  // 创建私聊房间
  async createrPrivateRoom({commit, state, dispatch}, {id}) {
    // 房间信息
    let roomInfo = await socketEmit('getPrivateRoomInfo', {id});
    let tempRoom = new TempRoom();
    let room = tempRoom.createRoom({ chatType: 'private', isActive: false });
    room.info = roomInfo.data;
    // 拉取聊天记录
    let chatRecords = dispatch('getPrivate', { id });
    
  },
  // 添加房间私聊聊天记录
  async getPrivate({commit, state}, info) {
    let { id } = info;
    let chatRecords = await socketEmit('getPrivateMsg', {
      to: info.creater,
      // 默认获取10条
      limit: 10
    });
    return chatRecords;
  }
  
};


/**
 * 消息来的时候 检查是否存在
 * 创建
 * 更新
 * 
 * 进入房间 检查房间是否存在 
 * 
 *
 * 
 * 
 * 
 * 
 */