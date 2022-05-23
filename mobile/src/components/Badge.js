import {LinearGradient} from "expo-linear-gradient";
import {
    View,
    ImageBackground,
    Text,
    StyleSheet,
    Pressable
} from "react-native";
import {useFonts} from "expo-font";


const Badge = ({title, next_view, params}) => {
    const [loaded] = useFonts({
        'Montserrat Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return <Pressable
        style={styles.container}
        onPress={() => {
            console.log(next_view, params)
        }}
    >
        <View
            style={styles.badge}
        >
            <Text style={styles.text}>{title}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#22272EF2',
        overflow: 'hidden',

        borderRadius: 25,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "#718096",

        width: 140,
        height: 60,
        margin: 4,
        marginLeft: 7
    },
    badge: {
        backgroundColor: '#22272EF2',

        width: '100%',
        height: '100%',

        paddingHorizontal: "18%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: "#718096",
        fontFamily: 'Montserrat Bold'
    }
});

export default Badge;