export const host = "http://localhost:5000";
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const deleteMessageRoute = `${host}/api/messages/deletemsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const setVerifyAccount = `${host}/api/auth/verify`;
export const setResendOTP = `${host}/api/auth/resendotp`;

// group chat
export const createGroup = `${host}/api/groupchat/create`
export const getGroupChats = `${host}/api/groupchat/getgroupchat`
export const deleteGroupChats = `${host}/api/groupchat/deletegroups`
export const exitGroupChats = `${host}/api/groupchat/exitgroupchats`
export const updateGroupChats = `${host}/api/groupchat/updategroupchat`
export const recieveMessageGroup = `${host}/api/messages/getmsggroup`;