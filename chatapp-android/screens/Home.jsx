import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,

} from "react-native";
import UserItem from "../components/UserItem";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentMessage, loadListFriend } from "../redux/action";
import { io } from "socket.io-client";


const Home = ( {navigation }  ) => {
  

 
 const socket = useRef();


  const {UserList, listGroupChats , user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
 


  useEffect(() => {
    if (user) {
      socket.current = io('http://10.0.2.2:5000');
      socket.current.emit("add-user", user._id);
    }
  }, [user]);


  
  const getMesasgeData = (item) =>{
    dispatch(loadCurrentMessage(user, item))
    
  }
  


  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ScrollView>
          <SafeAreaView>
            <View style={styles.heading}>
              <View  style={styles.search}>
              <Icon name="search1" size={26} style={{ color: "#ffff" }}></Icon>
              <TextInput placeholder="Tìm kiếm" 
                style= {
                  {
                    height: 50,
                    width : '70%',
                    color: '#fff',
                    borderRadius: 10,
                    fontSize : 20
                  }
                }

               />
              </View>
             

              <Icon 
              name="user" 
              size={28} 
              onPress ={() => navigation.navigate('login' , { text : {name : 123}})}
              style={{ color: "#ffff" , backgroundColor: '#CEECF5' , padding : 5 , borderRadius: 20 , marginRight :20}}></Icon>
            </View>

              {
               UserList && UserList.map((item) =>(
                  <TouchableOpacity onPress={() => {
                    getMesasgeData(item)
                    navigation.navigate("chat" , {userSelect  : item})
                    
                  }}>
                  <UserItem key={item._id} userName={item.username} avatarImage = {item.avatarImage}/>
                  </TouchableOpacity>
                ))
              }
            
            
            
          </SafeAreaView>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

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
    justifyContent :"space-between",
    alignItems: "center",
  },
  search :{
    display : 'flex',
    width : '70%',
    flexDirection:'row',
    justifyContent: "space-around",
    alignItems: 'center'

  },
  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
});
