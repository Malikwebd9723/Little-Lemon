import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)


    const handleNameChange = (text) => {
        setName(text);
      };
    
      const handleEmailChange = (text) => {
            // Regular expression for validating email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailPattern.test(text)?true:false);
            setEmail(text)
      };
    
      const handleSubmit = async () => {
        try {
            // Store name and email in AsyncStorage
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            Alert.alert('Data saved successfully!');

          } catch (error) {
            console.error('Error saving data:', error);
            Alert.alert('Error saving data:', error.message);
          }
      };

      useEffect(()=>{
            setIsFormValid(name.trim() !== '' && isEmailValid !== false?true:false)
      },[handleEmailChange])


    return (
        <>
        <View style={styles.container}>
            <View style={styles.greetContainer}>
                <Text style={styles.greet}>Let us get to know you</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>First Name</Text>
                <TextInput onChangeText={handleNameChange} value={name} style={styles.inputBoxes}></TextInput>
                <Text style={styles.inputText}>Email</Text>
                <TextInput onChangeText={handleEmailChange} value={email} style={styles.inputBoxes}></TextInput>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} disabled={!isFormValid}  style={styles.button}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View>
        </View>
        </>
        
    )
};

const styles = StyleSheet.create({
    container: { flex: 0.9},
    greetContainer: {flex:0.5,justifyContent:"center", backgroundColor: "#495E57"},
    greet: { fontSize: 30,fontWeight:"500", textAlign:"center" },
    inputContainer: {flex:1,justifyContent:"center",alignItems:"center", backgroundColor: "#495E57" },
    inputText: { fontSize: 30, fontWeight:"400"},
    inputBoxes: { borderWidth: 2, width: "70%", borderRadius: 10, padding: 10, margin: 10 },
    buttonContainer:{flex:0.5, justifyContent:"center",alignItems:"flex-end", paddingRight:30},
    button:{backgroundColor:"grey", width:"30%",alignItems:"center", borderRadius:10},
    buttonText:{fontSize:30, fontWeight:"300"}
})