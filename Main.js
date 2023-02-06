import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import { useState, useEffect ,useRef} from 'react';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import Final from './Final';


export default function Main({navigation}) {
    const [qstn, setQstn] = useState([])
    const [flag, setFlag] = useState(false)
    let [Qno, setQno] = useState(0)
    const [count, setCount] = useState(1)
    const [Score, setScore] = useState(0)
    const animation = useRef(null);
    const data = useSelector(state => state.data)
    const { qstndta } = data
    useEffect(() => {
        let arr = []
        arr.push(qstndta[Qno].correct_answer, ...qstndta[Qno].incorrect_answers)

        for (let i = arr.length - 1; i >= 0; i--) {
            let no = Math.floor(Math.random() * (i + 1))
            let temp = arr[i]
            arr[i] = arr[no]
            arr[no] = temp
        }
        setQstn(arr)
    }, [Qno])
    const CheckAnsw = (value) => {
        setFlag(!flag)
        if (decodeURIComponent(qstndta[Qno].correct_answer) == value) {
            setScore(Score + 10)
        }
        if (Qno != qstndta.length - 1) {
            setTimeout(() => {
                setCount(count + 1)
                setQno(Qno + 1)
                setFlag(false)
            }, 1000)
        }
        if (count == qstndta.length) {
            setTimeout(() => {
                setCount(count + 1)
            }, 1500)
        }

    }
const skip=()=>{
    if(Qno!=qstndta.length-1){
        setCount(count+1)
        setQno(Qno+1)
    }
    if(count==qstndta.length){
        setCount(count+1)
    }
}
    return (
        <View style={styles.container}> 
            {count !== qstndta.length + 1 ? <View >
            <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#8cc5db',
          paddingLeft:30
        }}
        
        source={require("./images/thinking.json")}
      />
                <Text style={styles.question}>{decodeURIComponent(qstndta[Qno].question)}</Text>
                <View style={styles.data}>
                    <Text>Q.NO.{count}/{qstndta.length}</Text>
                    <Text>Score:{Score}</Text>
                </View>

                <View style={styles.choicecontainer}>
                    <Text style={{...styles.choicePrefix,...decodeURIComponent(qstn[0]) == decodeURIComponent(qstndta[Qno].correct_answer) && flag ? { backgroundColor:"green" } : { backgroundColor:"#f5112f" }, ...!flag ? { backgroundColor:"#56a5eb" } : {}}}>A</Text>
                    <TouchableOpacity onPress={()=>CheckAnsw(decodeURIComponent(qstn[0]))}><Text style={styles.choices}>{decodeURIComponent(qstn[0])}</Text></TouchableOpacity>
                </View>
                <View style={styles.choicecontainer}>
                    <Text style={{...styles.choicePrefix,...decodeURIComponent(qstn[1]) == decodeURIComponent(qstndta[Qno].correct_answer) && flag ? { backgroundColor:"green" } : { backgroundColor:"#f5112f"  }, ...!flag ? { backgroundColor:"#56a5eb" } : {}}}>B</Text>
                    <TouchableOpacity onPress={()=>CheckAnsw(decodeURIComponent(qstn[1]))}><Text style={styles.choices}>{decodeURIComponent(qstn[1])}</Text></TouchableOpacity>
                </View >
                <View style={styles.choicecontainer}>
                    <Text style={{...styles.choicePrefix,...decodeURIComponent(qstn[2]) == decodeURIComponent(qstndta[Qno].correct_answer) && flag ? { backgroundColor:"green" } : { backgroundColor:"#f5112f" }, ...!flag ? { backgroundColor:"#56a5eb" } : {}}}>C</Text>
                    <TouchableOpacity onPress={()=>CheckAnsw(decodeURIComponent(qstn[2]))}><Text style={styles.choices}>{decodeURIComponent(qstn[2])}</Text></TouchableOpacity>
                </View>
                <View style={styles.choicecontainer}>
                    <Text style={{...styles.choicePrefix,...decodeURIComponent(qstn[3]) == decodeURIComponent(qstndta[Qno].correct_answer) && flag ? { backgroundColor:"green" } : { backgroundColor:"#f5112f"  }, ...!flag ? { backgroundColor:"#56a5eb" } : {}}}>D</Text>
                    <TouchableOpacity onPress={()=>CheckAnsw(decodeURIComponent(qstn[3]))}><Text style={styles.choices}>{decodeURIComponent(qstn[3])}</Text></TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{marginLeft:140,marginTop:20}}  onPress={()=>skip()}><Text style={{fontSize:20}}>Skip</Text></TouchableOpacity>
                    </View>
            </View> : <Final count={count} Score={Score} navigation={navigation} />}
<StatusBar style='auto'/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8cc5db',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    question: {
        marginLeft: 20,
        fontSize: 25,
        marginBottom:15
    },
    data: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    choicecontainer:{
        
        marginTop:10,
        width:250,
        height:34,
      
        borderWidth:1,
        flexDirection:"row",
       marginLeft:25
    },
    choicePrefix:{
        width:40,
        backgroundColor:"#56a5eb",
        textAlign:"center",
        height:32,
        fontSize:20
    },
    choices:{
        height:30,
        textAlign:"center",
        fontSize:20,
        width:200
    }
})