import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, View} from 'react-native';

const Books = ({ navigation }) => {
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
            onPress={() => navigation.navigate('welcome')}
        />
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Books;