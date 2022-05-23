import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Categories = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getBooks = async () => {
        try {
            const response = await fetch('http://www.easylibrary.site/api/books');
            const json = await response.json();
            return json.data
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBooks().then(r => setData(r));
    }, []);
    return <View style={styles.container}>
        {isLoading ? <ActivityIndicator size="large" /> :
            <View>
                {data?.map((d, i) => <Text key={`%i${i}`}>{d.title}</Text>)}
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('welcome')}
                />
            </View>
        }
    </View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#22272EF2',

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Categories;