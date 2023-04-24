import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import LottieView from 'lottie-react-native'
import { useRef } from 'react';


export default function Home({ navigation }) {
    const animation=useRef(null)
    return (
        <View style={styles.container}>

    
<LottieView
      autoPlay
      ref={animation}
      style={{
        width: 200,
        height: 250,
        backgroundColor: '#8cc5db',
      }}
     
      source={require("./images/Home.json")}
    />
            <Text style={styles.title}>Quick Quiz</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Start')}><Text style={styles.btntxt}>Play</Text></TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8cc5db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "#5cb8db",
        width: 100,
        textAlign: "center",
        marginTop:15
    },
    title: {
        fontSize: 50
    },
    image: {
        width: 210,
        height: 200,
        resizeMode: 'contain'
    },
    btntxt: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold'
    }
});
