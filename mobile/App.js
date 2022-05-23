import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Books, Categories, Home, Welcome} from "./src/views";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

const DetailsScreen = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Details Screen</Text>
        </View>
    );
}

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
            <Stack.Screen name="welcome" component={Welcome}/>
            <Stack.Screen name="home" component={Home}/>
            <Stack.Screen name="categories" component={Categories}/>
            <Stack.Screen name="category_books" component={Books}/>
            <Stack.Screen name="book" component={DetailsScreen}/>
        </Stack.Navigator>
    </NavigationContainer>;
}

