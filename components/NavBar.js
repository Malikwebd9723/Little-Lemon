import { StyleSheet, View, Image,TouchableOpacity, Text} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function NavBar() {
//   // Function to clear AsyncStorage
// const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage cleared successfully!');
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/Logo.png")} />
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={clearAsyncStorage} style={styles.button}><Text>Clear Storage</Text></TouchableOpacity>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 0.1, backgroundColor: "#8D8686", justifyContent:"center", alignItems:"center", padding:20},
    logo:{width:"100%", height:"100%"}
})
