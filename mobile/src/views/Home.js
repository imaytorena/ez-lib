import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

import Library from "./Library";
import Search from "./Search";
import Config from "./Config";
import {useFonts} from "expo-font";

const Tab = createBottomTabNavigator();

export default function Home() {
    const [loaded] = useFonts({
        'Montserrat Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return (<View style={{flex: 1}}>
            <View style={{
                backgroundColor: '#22272E',
                height: 70,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                borderBottomColor: "#718096",
            }}>
                <Text style={{
                    color: 'white',
                    // fontSize: 20,
                    // fontFamily: 'Montserrat Regular',
                    textAlign: "center",

                    fontFamily: 'Montserrat Bold',
                    fontWeight: "700",
                    fontSize: 30,
                    position: "absolute",
                    bottom: 0,
                }}>
                    EASY LIBRARY
                </Text>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        zIndex: -1,
                        backgroundColor: "rgb(66, 153, 225)",
                        width: "50%",
                        height: 12
                    }}
                />
                {/*</Text>*/}
            </View>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,
                    style: {
                        backgroundColor: '#22272E',
                        paddingBottom: 3
                    },
                    tabBarStyle: {
                        backgroundColor: '#22272E',
                        height: 70
                    },
                    tabBarLabelStyle: {
                        color: "red",
                    },
                    tabBarItemStyle: {
                        paddingTop: 10,
                        paddingBottom: 10,
                    }
                })}
            >
                <Tab.Screen
                    name="library"
                    component={Library}
                    options={({route, navigation}) => {
                        const state = navigation.getState();
                        return ({
                            tabBarLabelStyle: {
                                color: route.name === state["routeNames"][state.index] ? "#4299E1" : "#718096"
                            },
                            tabBarLabel: 'Librería',
                            tabBarIcon: ({focused}) => (
                                <MaterialCommunityIcons name="bookshelf" size={24}
                                                        color={focused ? "#4299E1" : "#718096"}/>
                            ),
                        })
                    }}
                />
                <Tab.Screen
                    style={{}}
                    name="search"
                    component={Search}
                    options={({route, navigation}) => {
                        const state = navigation.getState();
                        return ({
                            tabBarLabelStyle: {
                                color: route.name === state["routeNames"][state.index] ? "#4299E1" : "#718096"
                            },
                            tabBarLabel: 'Buscar',
                            tabBarIcon: ({focused}) => (
                                <MaterialCommunityIcons name="archive-search" size={24}
                                                        color={focused ? "#4299E1" : "#718096"}/>
                            ),
                        })
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Config}
                    options={({route, navigation}) => {
                        const state = navigation.getState();
                        return ({
                            tabBarLabelStyle: {
                                color: route.name === state["routeNames"][state.index] ? "#4299E1" : "#718096"
                            },
                            tabBarLabel: 'Configuración',
                            tabBarIcon: ({focused}) => (
                                <Ionicons name="settings" size={24} color={focused ? "#4299E1" : "#718096"}/>
                            ),
                        })
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
