import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from './screens/Home'
import Login from './screens/Login'
// import Footer from './components/Footer'
// import Profile from "./screens/Profile"
import Register from "./screens/Register"
// import Camera from "./screens/Camera"
import { useDispatch, useSelector } from 'react-redux'
import { loadListFriend, loadUser, verify } from './redux/action'
import Loader from "./components/Loader"
// import ChangePassword from './screens/ChangePassword'
import Verify from './screens/Verify'
import { AsyncStorage } from 'react-native'
import Chat from './screens/Chat'
// import ForgetPassword from './screens/ForgetPassword'
// import ResetPassword from './screens/ResetPassword'

const Stack = createNativeStackNavigator()

const Main = ({navigation}) => {
    const dispatch = useDispatch()



    // useEffect(() => {
    //     dispatch(loadUser())

    // }, [dispatch])


    const { user,  isAuthenticated, isVerify,  loading } = useSelector(state => state.auth)
    useEffect( () => {
        if(user){
            dispatch(loadListFriend(user._id))
        }
       
      }, [user]);

    //   useEffect(() => {
    //     if (user) {
    //       socket.current = io(host);
    //       socket.current.emit("add-user", user._id);
    //     }
    //   }, [user]);


      

    const checkRouter = ( isAuthenticated , isVerify) =>{
        let result = "";
        if(isAuthenticated && isVerify){
            result = "home"
            
            
        }
        else if (isAuthenticated && !isVerify){
            result = "verify"
        }
        else if(!isAuthenticated){
            result = "login"
        }

        return result;
    }
    // if(loading){
    //     setInterval(() => {
    //         dispatch({
    //             type: "logoutFailure"
    //         })
    //     }, 2000);
    // }
    return (
        loading ? <Loader /> : <NavigationContainer>

            <Stack.Navigator initialRouteName={checkRouter(isAuthenticated, isVerify)}>

                <Stack.Screen name='home' component={Home}  options={{ headerShown: false }} />
                <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name='verify' component={Verify} options={{ headerShown: false }} />
                <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }} />
                {/* <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name='changepassword' component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name='forgetpassword' component={ForgetPassword} options={{ headerShown: false }} />
                <Stack.Screen name='resetpassword' component={ResetPassword} options={{ headerShown: false }} /> */}


            </Stack.Navigator>

            {/* {isAuthenticated && <Footer />} */}


        </NavigationContainer>
        // <NavigationContainer>
        //     <Stack.Navigator initialRouteName='login'>
        //             <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
        //     </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default Main