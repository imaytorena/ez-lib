import React, {useState} from "react";
import {Button, StyleSheet, Text, View, ImageBackground} from 'react-native';

import {useFonts} from 'expo-font';
import {LinearGradient} from "expo-linear-gradient";

const Welcome = ({navigation}) => {
    const [loaded] = useFonts({
        'Montserrat Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return <View style={styles.container}>
        <ImageBackground
            style={styles.image}
            source={{
                // uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500'
                uri: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=700'
            }}
        >
            <LinearGradient
                colors={['#00000000', '#22272e']}
                style={{height: '100%', width: '100%'}}>
            </LinearGradient>
        </ImageBackground>

        <Text style={styles.textContainer}>
            <Text style={styles.welcomeText}>
                ✌ Bienvenidx a
            </Text>
        </Text>
        <Text style={styles.textContainer}>
            <Text style={styles.title}>
                EASY LIBRARY
            </Text>
            <View style={{
                position: "absolute",
                bottom: 38,
                zIndex: -1,
                backgroundColor: "rgb(66, 153, 225)",
                width: "100%",
                height: 12
            }}
            />
            <Text>{"\n"}</Text>
            <Text style={styles.subtitle}>Aplicación móvil 📱</Text>
        </Text>
        <View style={{maxWidth: "80%", textAlign: "center"}}>
            <Text style={styles.textContainer}>
                <Text style={{fontSize: 16, color: "rgb(113, 128, 150)", fontWeight: "400"}}>
                    Biblioteca escolar.
                    {"\n"}
                    Creado por estudiantes de la Universidad de Guadalajara.
                </Text>
            </Text>
        </View>
        {/* Buttons */}
        <View style={{
            height: "20%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
        }}>
            <View
                style={{
                    width: "55%",
                    backgroundColor: "#FFFFFF28"
                }}
            >
                <Button
                    color="#FFFFFF28"
                    title="Explorar catalogo"
                    onPress={() => navigation.navigate('home')}
                />
            </View>
            {/*<View*/}
            {/*    style={{width: "55%"}}*/}
            {/*>*/}
            {/*    <Button*/}
            {/*        title="Ingresar o crear una cuenta"*/}
            {/*        onPress={() => navigation.navigate('books')}*/}
            {/*        disabled*/}
            {/*    />*/}
            {/*</View>*/}
        </View>
        {/* Policies */}
        <View style={{width: "90%", marginBottom: "5%"}}>
            <Text style={{fontSize: 10, color: "rgb(113, 128, 150)", textAlign: "center", fontStyle: "italic"}}>
                Se pueden aplicar términos adicionales. Al usar esta app, usted acepta los <Text
                style={{color: "rgb(49, 130, 206)"}}>Términos de uso</Text> y la <Text
                style={{color: "rgb(49, 130, 206)"}}>Política de privacidad</Text>.
                {"\n"}
                Para más detalles vaya a Menú > Configuración > Políticas. <Text
                style={{color: "rgb(49, 130, 206)"}}>EASYLIBRARY®</Text>
            </Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#22272e',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        position: "relative",
        color: 'white',

        fontSize: 20,
        fontFamily: 'Montserrat Regular',
        fontWeight: "700",
        textAlign: "center",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 15,
        color: "rgb(113, 128, 150)",
        fontWeight: "500"
    },
    title: {
        fontFamily: 'Montserrat Bold',
        fontSize: 40,
    },
    subtitle: {
        width: "100%",
        color: "rgb(66, 153, 225)"
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover'

    },
});

export default Welcome;