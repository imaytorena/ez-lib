import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Books from "./Books";


function BooksScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Books!</Text>
        </View>
    );
}

function SearchScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Search!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings!</Text>
        </View>
    );
}

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
                name="books"
                component={Books}
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
                component={SearchScreen}
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
                component={SettingsScreen}
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