import React, {useEffect, useState} from "react";
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {Card, Title} from "../components";
import {categories} from "../models/categories";
import Badge from "../components/Badge";

// https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1560174038-da43ac74f01b

const Library = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // const getBooks = async () => {
    //     try {
    //         const response = await fetch('http://www.easylibrary.site/api/books');
    //         const json = await response.json();
    //         return json.data
    //     } catch (error) {
    //         console.error(error);
    //         return [];
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    //
    useEffect(() => {
        setLoading(false);
        setData(categories.filter((category, index) => (index % 2)))
        //     getBooks().then(r => setData(r));
    }, []);

    if (!data) return null;

    return <View style={styles.container}>
        {isLoading ?
            <ActivityIndicator size="large"/>
            : <ScrollView style={styles.scrollView}>
                <View style={{ height: 350}}>
                        <Title
                            text={"Categorías"}
                            size={30}
                        />
                        <FlatList
                            style={{ height: 350 }}
                            keyExtractor={item => item.nicename}
                            initialScrollIndex={0}
                            initialNumToRender={2}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item, index}) => (
                                <View style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Card
                                        title={data[index]['name']}
                                        next_view={'book'}
                                        params={data[index]}
                                        image={data[index].hasOwnProperty('thumbnail') ? data[index]['thumbnail'] : 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1601724161617-928285222d5b'}
                                    />
                                    <Card
                                        title={categories[index * 2]['name']}
                                        next_view={'book'}
                                        params={categories[index * 2]}
                                        image={categories[index * 2].hasOwnProperty('thumbnail') ? categories[index * 2]['thumbnail'] : 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1601724161617-928285222d5b'}
                                    />
                                </View>
                            )}
                            data={data}
                            horizontal
                        />
                </View>
                <View style={{ height: 140 }}>
                    <Title
                        text={"Los más visitados"}
                        size={30}
                    />
                    <FlatList
                        style={{ height: 80}}
                        keyExtractor={item => item.nicename}
                        initialScrollIndex={0}
                        initialNumToRender={10}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => (
                            <View style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Badge
                                    title={data[index]['name']}
                                    next_view={'book'}
                                    params={data[index]}
                                    image={data[index].hasOwnProperty('thumbnail') ? data[index]['thumbnail'] : 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1601724161617-928285222d5b'}
                                />
                            </View>
                        )}
                        data={data}
                        horizontal
                    />
                </View>
                <View style={{ height: 250}}>
                    <Title
                        text={"Nuevos Materiales"}
                        size={30}
                    />
                    <FlatList
                        style={{ height: 220 }}
                        keyExtractor={item => item.nicename}
                        initialScrollIndex={0}
                        initialNumToRender={2}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => (
                            <View style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Card
                                    title={data[index]['name']}
                                    next_view={'book'}
                                    params={data[index]}
                                    image={data[index].hasOwnProperty('thumbnail') ? data[index]['thumbnail'] : 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1601724161617-928285222d5b'}

                                    stylesContainer={{ height: 180, width: 180  }}
                                />
                            </View>
                        )}
                        data={data}
                        horizontal
                    />
                </View>
            </ScrollView>
        }
    </View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#22272EF2',

        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-start',

        paddingTop: "10%",
        // paddingBottom: "15%",
    },
    scrollView: {
        height: "100%"
    }
});

export default Library;