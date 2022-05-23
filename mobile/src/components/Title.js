import { Text, StyleSheet} from "react-native";
import {useFonts} from "expo-font";


const Title = ({ text, size=20 }) => {
    const [loaded] = useFonts({
        'Montserrat Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return <Text style={{...styles.textContainer , fontSize:  size }}>{text}</Text>
}

const styles = StyleSheet.create({
    textContainer: {
        width: "100%",
        textAlign: "left",

        paddingLeft: "7%",
        paddingTop: "4%",
        paddingBottom: "4%",

        color: 'white',
        fontFamily: 'Montserrat Bold',
        fontWeight: "bold"
    },
});

export default Title;