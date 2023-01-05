import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { getMyInfo } from 'api/user-api';
import { getChatRooms } from 'api/chat-api';
import { io, Socket } from 'socket.io-client';
import { UserType } from 'types/userType';
import { ChatRoomType } from 'types/chatType';
const socket: Socket = io('http://34.64.44.34:3003/chat', {
  transports: ['websocket'],
});
function Chat() {
  /** user 정보 가져오기 */
  const [userInfo, setUserInfo] = useState<UserType>({
    _id: '',
    name: '',
    image: '',
    nickName: '',
    email: '',
    password: '',
    phoneNumber: '',
    postalCode: '',
    address1: '',
    address2: '',
    reports: [],
    suspension: false,
    role: '',
    createdAt: '',
    updatedAt: '',
    intro: '',
  });
  const setUserInfoData = async () => {
    const user: UserType = await getMyInfo();
    setUserInfo(user);
  };
  useEffect(() => {
    setUserInfoData();
  }, []);

  /** 채팅방 목록 정보 가져오기 */
  const [chatRoomsInfo, setChatRoomsInfo] = useState<ChatRoomType[]>([]);
  const setChatRoomsInfoData = async () => {
    const chatRooms: ChatRoomType[] = await getChatRooms();
    setChatRoomsInfo(chatRooms);
  };
  useEffect(() => {
    setChatRoomsInfoData();
  }, []);

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex max-w-screen-lg mx-auto">
          <div className="w-1/5">
            <SidePanel
              key={userInfo._id}
              user={userInfo}
              chatRoomList={chatRoomsInfo}
              socket={socket}
            />
          </div>
          <div className="w-4/5">
            <MainPanel key={userInfo._id} user={userInfo} socket={socket} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
