import { View, Text, TextInput, StyleSheet , TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { useDispatch } from "react-redux";

import Icon from "react-native-vector-icons/Feather";
const ChatInput = ({ userName, avatarImage }) => {
  const dispatch = useDispatch();


  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth : 1,
        height :80
      }}
    >
      <Icon
        name="smile"
        size={26}
        style={{ color: "#900", marginLeft: 10 }}
      ></Icon>

      <TextInput
        placeholder="Enter text"
        style={styles.input}
      />
      <TouchableOpacity style={styles.addBtn}>
        <Icon name="send" size={20} color="#900" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;


const styles = StyleSheet.create({

    addBtn: {
      backgroundColor: "#fff",
      width: 50,
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
      borderColor: "#900",
      padding: 10,
      paddingLeft: 15,
      borderRadius: 10,
      marginVertical: 5,
      fontSize: 15,
      width : '70%'
    },
  });