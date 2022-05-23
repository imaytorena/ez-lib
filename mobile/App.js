import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Books, Welcome} from "./src/views";

const Stack = createNativeStackNavigator();

const DetailsScreen = () => {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
  );
}

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
      <Stack.Screen  name="welcome" component={Welcome} />
      <Stack.Screen  name="categories" component={Books} />
      <Stack.Screen name="category_books" component={DetailsScreen} />
      <Stack.Screen name="book" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>;
}


