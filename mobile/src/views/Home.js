import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Library from "./Library";
import Search from "./Search";
import Config from "./Config";

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
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
                        tabBarIcon: ({ focused}) => (
                            <MaterialCommunityIcons name="bookshelf" size={24} color={focused ? "#4299E1" : "#718096"}/>
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
                        tabBarIcon: ({ focused}) => (
                            <MaterialCommunityIcons name="archive-search" size={24} color={focused ? "#4299E1" : "#718096"}/>
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
                        tabBarIcon: ({ focused}) => (
                            <Ionicons name="settings" size={24} color={focused ? "#4299E1" : "#718096"}/>
                        ),
                    })
                }}
            />
        </Tab.Navigator>
    );
}