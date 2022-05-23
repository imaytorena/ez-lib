import {LinearGradient} from "expo-linear-gradient";
import {
    View,
    ImageBackground,
    Text,
    StyleSheet,
    Pressable
} from "react-native";


const Card = ({title, image, next_view, params, stylesContainer}) => {
    return <Pressable
        style={{...styles.container, ...stylesContainer}}
        onPress={ () => { console.log(next_view, params) }}
    >
        <ImageBackground
            style={styles.image}
            source={{
                uri: image
            }}
        >
            <LinearGradient
                colors={['#00000000', '#22272e']}
                style={{
                    height: '100%',
                    width: '100%'
                }}>
            </LinearGradient>
            <Text style={styles.text}>{title}</Text>
        </ImageBackground>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#22272EF2',
        overflow: 'hidden',
        borderRadius: 25,

        width: 140,
        height: 120,
        margin: 10
    },
    image: {
        backgroundColor: '#22272EF2',

        width: '100%',
        height: '100%',
        resizeMode: 'cover'

    },
    gradient: {
        height: '100%',
        width: '100%'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: "white",
        position: "absolute",
        bottom: 0,
        marginBottom: 12
    }
});

export default Card;