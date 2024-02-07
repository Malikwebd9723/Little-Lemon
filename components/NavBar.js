import { StyleSheet, View, Image,TouchableOpacity} from "react-native"

export default function NavBar({navigation}) {

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/Logo.png")} />
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Image style={styles.avatarImg} source={require("../assets/Profile.png")}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexDirection:"row",flex: 0.15, justifyContent:"space-around", alignItems:"center", paddingTop:20},
    logo:{height:"100%",resizeMode:"contain"},
    avatarImg:{width:60, height:60,backgroundColor:"red",borderRadius:50, resizeMode:"contain"},

})
