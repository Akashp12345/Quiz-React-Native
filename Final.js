import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  ToastAndroid } from 'react-native';
import { useDispatch } from "react-redux"

import { useState, useEffect, useRef } from "react"


import LottieView from 'lottie-react-native';

export default function Final({  Score, navigation }) {
    const dispatch = useDispatch()
    const animation = useRef(null);
    const [msg, setMsg] = useState("")
    const [timer, setCount] = useState(5)
    useEffect(() => {
        if (Score >= 90) {
            setMsg("Wow ,Excellent Brain Power")
        }
        else if (Score <= 80 && Score >= 70) {
            setMsg("Yes,Average Brain Power")
        } else if (Score <= 70 && Score >= 50) {
            setMsg("Need Brain Exersice !")
        }
        else if (Score <= 50 && Score >= 30) {
            setMsg("Nice Try !")
        }
        else {
            setMsg("Your are Fail !")
        }
    let home=setInterval(()=>{
        setCount(count=>count-1)
       
    },1000)
    setTimeout(()=>{
        
        navigation.navigate("Home")
   
},6000)
    return ()=>clearInterval(home)
   
    }, [])
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hey Player</Text>
            <Text style={{ fontSize: 20 }}>Your Score is {Score}</Text>
            
            {Score >= 50 ? <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#8cc5db',
                }}

                source={require("./images/Win.json")}
            /> : <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#8cc5db',
                }}

                source={require("./images/lose.json")}
            />}
            <Text style={{ fontSize: 20 }}>{msg}</Text>
            <Text style={{marginTop:200}}>Returning to Home in {timer}sec</Text>
            <StatusBar style='auto' />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8cc5db",
        width: 400
    },
    image: {
        width: 210,
        height: 200,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 40
    }
})