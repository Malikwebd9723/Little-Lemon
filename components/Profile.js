import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Switch} from "react-native";
import NavBar from "./NavBar";
import { MaskedTextInput } from "react-native-mask-text";
export default function Profile() {
    const[switchOn, setSwitchOn] = useState(false);
    const toggleSwitch = ()=>{
        setSwitchOn(!switchOn)
    }
    return (
        <>
            <NavBar />
            <ScrollView style={styles.container} keyboardDismissMode="on-drag">
                <View style={styles.logoutContainer}>
                <Text style={styles.h1}>Personal Information</Text>
                <TouchableOpacity style={styles.logoutBtn}><Text>Logout</Text></TouchableOpacity>
                </View>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>Avatar</Text>
                    <View style={styles.avatarInrContainer}>
                    <Image style={styles.avatarImg} source={require("../assets/Logo.png")}/>
                    <TouchableOpacity style={styles.changeBtn}><Text style={{color:"white"}}>Change</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.removeBtn}><Text>Remove</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <Text>First Name</Text>
                    <TextInput style={styles.textInput} maxLength={20}></TextInput>
                    <Text>Last Name</Text>
                    <TextInput style={styles.textInput} maxLength={20}></TextInput>
                    <Text>Email</Text>
                    <TextInput style={styles.textInput} keyboardType="email-address"></TextInput>
                    <Text>Phone Number</Text>
                    <MaskedTextInput keyboardType="phone-pad" mask="(999) 999-9999" onChangeText={(text, rawText) => {console.log(text);console.log(rawText);}} style={styles.textInput}/>
                    {/* email notification conatainer */}
                    <View style={styles.emailContainer}>
                        <Text style={styles.emailText}>Email Notification</Text>
                        <View style={styles.emailInrContainer}>
                            <Text>Order Statuses</Text>
                            <Switch onValueChange={toggleSwitch} value={switchOn}></Switch>
                        </View>
                        <View style={styles.emailInrContainer}>
                            <Text>Password Changes</Text>
                            <Switch onValueChange={toggleSwitch} value={switchOn}></Switch>
                        </View>
                        <View style={styles.emailInrContainer}>
                            <Text>Special Offers</Text>
                            <Switch onValueChange={toggleSwitch} value={switchOn}></Switch>
                        </View>
                        <View style={styles.emailInrContainer}>
                            <Text>Newsletters</Text>
                            <Switch onValueChange={toggleSwitch} value={switchOn}></Switch>
                        </View>
                    </View>
                </View>
                <View style={styles.takeChanges}>
                    <TouchableOpacity style={styles.takeChangesBtn}><Text style={{fontSize:15, fontWeight:"500"}}>Discard Changes</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.takeChangesBtn}><Text style={{fontSize:15, fontWeight:"500"}}>Save Changes</Text></TouchableOpacity>

                </View>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container:{ flex: 1, margin: 5, borderWidth:1, borderRadius:20,padding:10},
    h1:{ fontSize: 20, fontWeight: "500" },
    logoutContainer:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginRight:10},
    logoutBtn:{backgroundColor:"orange",padding:10,borderRadius:10},
    avatarContainer:{justifyContent:"center", marginTop:10},
    avatarText:{color:"grey"},
    avatarInrContainer:{flexDirection:"row", alignItems:"center", marginTop:5},
    avatarImg:{width:80, height:80,backgroundColor:"red",borderRadius:50, resizeMode:"contain"},
    changeBtn:{backgroundColor:"green", padding:10, margin:10, borderRadius:5, borderWidth:1},
    removeBtn:{padding:10, margin:10, borderRadius:5, borderWidth:1},
    // form container start here
    formContainer:{paddingTop:20},
    textInput:{borderWidth:1,borderRadius:10, margin:2, padding:10,marginBottom:20},
    // email styles
    emailContainer:{},
    emailText:{fontSize:17,fontWeight:"500"},
    emailInrContainer:{flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:10},
    takeChanges:{flexDirection:"row",margin:10, marginBottom:40,justifyContent:"space-around"},
    takeChangesBtn:{borderWidth:1,padding:20,borderRadius:20}
})