import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Image ,TextInput,ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState,useEffect,useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import { add } from './data/Reducer';
import axios from 'axios';
import LottieView from 'lottie-react-native';

export default function Start({navigation}){
    const[number,setNumber]=useState(10)
    const[Select1,setSelect1]=useState(0)
    const[Select2,setSelect2]=useState("Any")
    const[error,setError]=useState(false)
    const data=useSelector(state=>state.data)
    const {Category,Difficulty,qstndta}=data
    const dispatch=useDispatch()
const animation=useRef(null)

    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=${number}&category=${Select1}&difficulty=${Select2}&type=multiple&encode=url3986`,)
            .then(res => {
                if (res.data.response_code == 0) {
                    dispatch(add(res.data.results))
                    
                }
                else {
                    setError(true)
                }
            }).catch(Error => {
                console.log(Error)
            })
    }, [Select2, Select1, number])
    const StartGame = () => {
        if (qstndta.length !== 0 && error !==true) {
           navigation.navigate("Main")
        }
        else {
            ToastAndroid.show("No Data Available",2000)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize:35}}>Try Brain Power!</Text>
            <LottieView
      autoPlay
      ref={animation}
      style={{
        width: 200,
        height: 250,
        backgroundColor: '#8cc5db',
      }}
      source={require("./images/second.json")}
    />
            <Text style={styles.title}> No of Questions!</Text>
             <TextInput style={{width:'50%',height:44,borderRadius:6,paddingHorizontal:10,borderWidth:2,marginTop:10}} autoCorrect={true} autoCapitalize='none' placeholder='10' defaultValue='10' onChangeText={(e)=>setNumber(e)}/>
             <Text style={styles.title}> Select Category</Text>
             <Picker style={{width:"55%",borderRadius:6,paddingHorizontal:10,borderWidth:2,height:44,backgroundColor:"#8cc5db"}} selectedValue={Select1} onValueChange={(e)=>{setSelect1(e),setError(false)}}>{Category.map((item,index)=>(
                <Picker.Item key={item.id} label={item.type} value={item.id} style={{fontSize:20}}/>
             ))}</Picker>
             <Text style={styles.title}> Select Difficulty!</Text>
             <Picker style={{width:"55%",borderRadius:6,paddingHorizontal:10,borderWidth:2,height:40,backgroundColor:"#8cc5db"}} selectedValue={Select2} onValueChange={(e)=>{setSelect2(e),setError(false)}}>{Difficulty.map((item,index)=>(
                <Picker.Item key={item} label={item} value={item} style={{fontSize:20,height:40}}/>
             ))}</Picker>
            <TouchableOpacity style={styles.btn} ><Text style={styles.btntxt} onPress={()=>StartGame()}>Start</Text></TouchableOpacity>
      <StatusBar style="auto" />
        </View>
        
    )
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#8cc5db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:15,
        borderWidth:2,
        borderColor:"black",
        backgroundColor:"#5cb8db",
        width:100,
        textAlign:"center",
        marginTop:15
       },
       title:{
        fontSize:20,
        fontWeight:'400',
        marginTop:15
       },
       image:{
     width:210,
     height:200,
     resizeMode:'contain'
       },
       btntxt:{
        textAlign:"center",
        fontSize:20,
        fontWeight:'bold'
       }
})