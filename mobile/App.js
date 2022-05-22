import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch('http://www.easylibrary.site/api/books');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);
  return <View style={styles.container}>
      {data?.map((d, i) => <Text key={`%i${i}`}>{d.title}</Text>)}
      <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
      />
    </View>
};
const DetailsScreen = () => {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>;
}


