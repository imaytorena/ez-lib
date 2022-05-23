import React from "react";
import {Button, StyleSheet, Text, View} from 'react-native';
import {Image} from "react-native-web";

const Welcome = ({navigation}) => {

    return <View style={styles.container}>
        <Image
            style={styles.image}
            source={'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop'}
        />
        <Text style={styles.textContainer}>
            <Text style={{fontSize: "medium", color: "rgb(113, 128, 150)", fontWeight: "400"}}>
                ✌ Bienvenidx a
            </Text>
        </Text>
        <Text style={styles.textContainer}>
            <Text style={styles.title}>
                EASY LIBRARY
            </Text>
            <span style={{
                position: "absolute",
                bottom: 38,
                zIndex: "-1",
                backgroundColor: "rgb(66, 153, 225)",
                width: "100%",
                height: "12px"
            }}/>
            <Text style={styles.subtitle}>Aplicación móvil 📱</Text>
        </Text>
        <View style={{maxWidth: "80%", textAlign: "center"}}>
            <Text style={styles.textContainer}>
                <Text style={{fontSize: "medium", color: "rgb(113, 128, 150)", fontWeight: "400"}}>
                    Biblioteca escolar.
                    <br/>
                    Creado por estudiantes de la Universidad de Guadalajara.
                </Text>
            </Text>
        </View>
        <View style={{height: "150px", width: "90%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
            <View
                style={{
                    width: "55%",
                    backgroundColor: "#FFFFFF28"
                }}
            >
                <Button
                    color="#FFFFFF28"
                    title="Explorar catalogo"
                    onPress={() => navigation.navigate('categories')}
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
        <View>
            <Text style={{fontSize: "10px", color: "rgb(113, 128, 150)", textAlign: "center", fontStyle: "italic"}}>
                Se pueden aplicar términos adicionales. Al usar esta app, usted acepta los <Text style={{ color: "rgb(49, 130, 206)" }}>Términos de uso</Text> y la <Text style={{ color: "rgb(49, 130, 206)" }}>Política de privacidad</Text>.
                <br/>
                Para más detalles vaya a Menú > Configuración > Políticas. <Text style={{ color: "rgb(49, 130, 206)" }}>EASYLIBRARY®</Text>
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

        fontSize: "20px",
        fontFamily: "BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        fontWeight: "bold",

        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontSize: "xxx-large",
    },
    subtitle: {
        color: "rgb(66, 153, 225)"
    },
    image: {
        // border: '1px solid red',
        width: '100%',
        height: '45%',
        resizeMode: 'cover',
        padding: "4rem"

    },
});

export default Welcome;