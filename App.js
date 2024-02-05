import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from "./components/Login";
import Navbar from "./components/NavBar";
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();


function App() {
  const [hasBothKeys, setHasBothKeys] = useState(false)
  useEffect(() => {
    const checkStorage = async () => {
      try {
        // Retrieve multiple items from AsyncStorage
        const keys = ['name', 'email'];
        const storedData = await AsyncStorage.multiGet(keys);

        // Check if both "name" and "email" keys exist
        const hasBothKeys = storedData.every(([key, value]) => value !== null);
        setHasBothKeys(hasBothKeys);
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
        Alert.alert('Error checking AsyncStorage:', error.message);
      }
    };
    checkStorage();
  },[])

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!hasBothKeys ? (
            // Onboarding completed, user is signed in
            <Stack.Screen name="Login" component={Login} />
          ) : (
            // User is NOT signed in
            <Stack.Screen name="Profile" component={Profile} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </> 
  );
}

export default App;