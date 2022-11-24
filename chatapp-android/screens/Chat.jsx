import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { io } from "socket.io-client";

import ChatInput from "../components/ChatInput";
import { loadCurrentMessage } from "../redux/action";

const Chat = ({ route, navigation }) => {
  const { userSelect } = route.params;
  const { user } = useSelector((state) => state.auth);
  const socket = useRef();
  const { messagess } = useSelector((state) => state.messagess);

  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const dispatch = useDispatch();

  



  return (
    <>
      <View style={styles.heading}>
        <View style={styles.nameUser}>
          <Icon
            name="caretleft"
            size={26}
            style={{ color: "#ffff", marginLeft: 20 }}
            onPress={() => navigation.navigate("home")}
          ></Icon>

          <Text
            style={{
              color: "#ffff",
              marginLeft: 10,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {userSelect.username}
          </Text>
        </View>

        <Icon
          name="exclamationcircleo"
          size={28}
          onPress={() => navigation.navigate("login")}
          style={{
            color: "#ffff",
            marginRight: 20,
          }}
        ></Icon>
      </View>

      <ScrollView>
        <SafeAreaView>
          <View>
            { messagess && messagess.map((mes) => (
              <View 
              style={ {
                display : 'flex', 
                alignItems: mes.fromSelf ? 'flex-end' :'flex-start',    
                justifyContent: 'center'
              }}
              >
                <Text
                 style={ {
                  fontSize : 18,
                  margin: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderWidth :1,
                  width: '30%',
                  borderRadius:20,
                  

                 }}
                >{mes.message}</Text>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>

      <ChatInput />
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    height: 70,
    textAlign: "center",
    marginTop: 25,
    color: "#fff",
    backgroundColor: "#58D3F7",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameUser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // sended:{
  //   display: 'flex',
  //   justifyContent :"flex-end",

  // },
  // recieved:{
  //   display: 'flex',
  //   justifyContent :'flex-start',
  // }
});
