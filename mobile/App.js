import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Books, Categories, Home, Welcome} from "./src/views";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
    return <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle:{
                    backgroundColor: '#22272e'
                },
                cardStyle:{
                    backgroundColor: '#22272e'
                },
            }}
        >
            <Stack.Screen name="home" component={Home}/>
            {/*<Stack.Screen name="welcome" component={Welcome}/>*/}
        </Stack.Navigator>
    </NavigationContainer>;
}

