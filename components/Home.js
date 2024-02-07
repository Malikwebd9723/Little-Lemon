import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Navbar from "./NavBar";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydb.db');



export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // creating table if not exist
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT, category TEXT)'
            );
        });
        setTimeout(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json");
                    const json = await response.json();
                    db.transaction(tx => {
                        json.menu.forEach(item => {
                            tx.executeSql(
                                'SELECT * FROM items WHERE name = ?',
                                [item.name],
                                (_, { rows }) => {
                                    if (rows.length === 0) {
                                        tx.executeSql(
                                            'INSERT INTO items (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
                                            [item.name, item.price, item.description, item.image, item.category]
                                        );
                                    }
                                }
                            )
                        });
                    });
                    db.transaction(tx => {
                        tx.executeSql('SELECT * FROM items', [], (_, { rows }) => {
                            const fetchedData = rows._array;
                            setData(fetchedData);
                        });
                    });
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData()
        }, 1000);

    }, [])
    return (
        <ScrollView style={styles.container}>
            <Navbar navigation={navigation} />
            {/* head Container Start */}
            <View style={styles.headContainer}>
                <Text style={styles.h1}>Little Lemon</Text>
                <Text style={styles.h3}>Chicago</Text>
                <View style={styles.aboutContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 500, flex: 1, padding: 5 }}>We are family owned Mediterranean restaurant focused on traditional recipes served with a modern twist.</Text>
                    <Image style={styles.heroImage} source={require("../assets/heroimage.png")} />
                </View>
                <View style={styles.searchBox}>
                    <MaterialIcons style={styles.searchGlass} name="search" size={30} color="black" />
                </View>
            </View>
            {/* Horizontal category container start */}
            <View style={styles.categoryContainer}>
                <Text style={{ fontSize: 25, fontWeight: 600 }}>ORDER FOR DELIVERY!</Text>
                <ScrollView horizontal={true}>
                    <TouchableOpacity style={styles.catBtn}><Text style={{ fontSize: 15, fontWeight: 600 }}>Starters</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.catBtn}><Text style={{ fontSize: 15, fontWeight: 600 }}>Mains</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.catBtn}><Text style={{ fontSize: 15, fontWeight: 600 }}>Desserts</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.catBtn}><Text style={{ fontSize: 15, fontWeight: 600 }}>Drinks</Text></TouchableOpacity>
                </ScrollView>
            </View>
            {/* Menu Container start */}
            {!loading ? (data.map((item) => (
                <View key={item.id} style={styles.menuContainer}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <View style={styles.menuItemDesc}>
                        <Text style={{ flex: 1, fontSize: 18 }}>{item.description}</Text>
                        <Image style={styles.menuItemImage} source={require("../assets/greeksalad.png")} />
                    </View>
                    <Text style={styles.menuItemPrice}>${item.price}</Text>
                </View>
            ))

            ) : (<ActivityIndicator style={{ padding: 20 }} size={"large"} color={"Grey"} />)}

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    // main container "Scrollview"
    container: {},
    // main header container "View"
    headContainer: { backgroundColor: "grey", padding: 10 },
    h1: { fontSize: 50, fontWeight: "700", color: "yellow" },
    h3: { fontSize: 30, fontWeight: "800" },
    aboutContainer: { flexDirection: "row", alignItems: "center" },
    heroImage: { flex: 0.8, resizeMode: "cover", height: 180, borderRadius: 15 },
    searchBox: { backgroundColor: "white", alignItems: 'center', justifyContent: "center", width: 50, height: 50, borderRadius: 50 },
    searchGlass: {},
    // horizontal container "Scrollview"
    categoryContainer: { padding: 10, paddingBottom: 0, borderBottomWidth: 1, borderBottomColor: "grey" },
    catBtn: { padding: 15, margin: 10, backgroundColor: "grey", borderRadius: 20 },
    // verticall container "View"
    menuContainer: { padding: 10 },
    menuItemName: { fontSize: 25, fontWeight: "800" },
    menuItemDesc: { flexDirection: "row", alignItems: "center" },
    menuItemImage: { flex: 0.5, resizeMode: "cover", height: 120 },
    menuItemPrice: { fontSize: 20, fontWeight: "800", color: "grey", padding: 10, paddingTop: 0 },
})