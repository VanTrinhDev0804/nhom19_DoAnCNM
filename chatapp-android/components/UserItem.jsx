import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper'
import { useDispatch } from 'react-redux'


const UserItem = ({ userName, avatarImage }) => {

    const dispatch = useDispatch()
    const [ isHaveTextNew, setHaveTextNew] = useState(false);



    return (
        <View
            style={{
                padding: 10,
                height :80,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-between',
            }}
        >
            <Avatar.Image style= {{ marginLeft :20}} size={64} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360' }} />
            <View style={{ width: "70%", borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 20, marginVertical: 5, color: "#900", fontWeight :isHaveTextNew ? '700': '300' }}>
                    {userName}
                </Text>
                <Text style={

                    { color: isHaveTextNew ? "#00000" :  "#4a4a4a",
                    fontWeight :isHaveTextNew ? '700': '300'
                    }
                    
                    }>{userName}</Text>
            </View>
        
           {isHaveTextNew ?
           <Text style={{ color: "#fff"  , backgroundColor:"#FF4000" , paddingHorizontal: 7 , borderRadius: 20 }}>N</Text> : ""
            } 
        </View>
    )
}

export default UserItem