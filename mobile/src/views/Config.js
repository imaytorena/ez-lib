// import React, { useState, useEffect } from 'react';
//
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { SearchBar } from 'react-native-elements';
//
// const Search = ({ navigation }) => {
//     const [search, setSearch] = useState('');
//     const [filteredDataSource, setFilteredDataSource] = useState([]);
//     const [masterDataSource, setMasterDataSource] = useState([]);
//
//     useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts')
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 setFilteredDataSource(responseJson);
//                 setMasterDataSource(responseJson);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);
//
//     const searchFilterFunction = (text) => {
//         // Check if searched text is not blank
//         if (text) {
//             // Inserted text is not blank
//             // Filter the masterDataSource
//             // Update FilteredDataSource
//             const newData = masterDataSource.filter(function (item) {
//                 const itemData = item.title
//                     ? item.title.toUpperCase()
//                     : ''.toUpperCase();
//                 const textData = text.toUpperCase();
//                 return itemData.indexOf(textData) > -1;
//             });
//             setFilteredDataSource(newData);
//             setSearch(text);
//         } else {
//             // Inserted text is blank
//             // Update FilteredDataSource with masterDataSource
//             setFilteredDataSource(masterDataSource);
//             setSearch(text);
//         }
//     };
//
//     const ItemView = ({ item }) => {
//         return (
//             // Flat List Item
//             <Text style={styles.itemStyle} onPress={() => getItem(item)}>
//                 {item.id}
//                 {'.'}
//                 {item.title.toUpperCase()}
//             </Text>
//         );
//     };
//
//     const ItemSeparatorView = () => {
//         return (
//             // Flat List Item Separator
//             <View
//                 style={{
//                     height: 0.5,
//                     width: '100%',
//                     backgroundColor: '#C8C8C8',
//                 }}
//             />
//         );
//     };
//
//     const getItem = (item) => {
//         // Function for click on an item
//         alert('Id : ' + item.id + ' Title : ' + item.title);
//     };
//
//     return (
//         <View style={styles.container}>
//             <SearchBar
//                 round
//                 onChangeText={(text) => {
//                     searchFilterFunction(text)
//                 }}
//                 onClear={(_) => {
//                     searchFilterFunction('')
//                 }}
//                 placeholder="Type Here..."
//                 value={search}
//             />
//             {/*<FlatList*/}
//             {/*    data={filteredDataSource}*/}
//             {/*    keyExtractor={(item, index) => index.toString()}*/}
//             {/*    ItemSeparatorComponent={ItemSeparatorView}*/}
//             {/*    renderItem={ItemView}*/}
//             {/*/>*/}
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#22272EF2'
//     },
//     itemStyle: {
//         padding: 10,
//     },
// });
//
// export default Search;

// Example of Collapsible/Accordion/Expandable List View in React Native
// https://aboutreact.com/collapsible-accordion-expandable-view/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';

//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';

//Dummy content to show
//You can also use dynamic data by calling web service
const CONTENT = [
    {
        title: 'Terms and Conditions',
        content:
            'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
        title: 'Privacy Policy',
        content:
            'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
    },
    {
        title: 'Return Policy',
        content:
            'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
];

//To make the selector (Something like tabs)
const SELECTORS = [
    { title: 'T&C', value: 0 },
    { title: 'Privacy Policy', value: 1 },
    { title: 'Return Policy', value: 2 },
    { title: 'Reset all' },
];

const Config = () => {
    // Ddefault active selector
    const [activeSections, setActiveSections] = useState([]);
    // Collapsed condition for the single collapsible
    const [collapsed, setCollapsed] = useState(true);
    // MultipleSelect is for the Multiple Expand allowed
    // True: Expand multiple at a time
    // False: One can be expand at a time
    const [multipleSelect, setMultipleSelect] = useState(false);

    const toggleExpanded = () => {
        //Toggling the state of single Collapsible
        setCollapsed(!collapsed);
    };

    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    const renderHeader = (section, _, isActive) => {
        //Accordion Header view
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        //Accordion Content view
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Animatable.Text
                    animation={isActive ? 'bounceIn' : undefined}
                    style={{ textAlign: 'center', color: 'white' }}>
                    {section.content}
                </Animatable.Text>
            </Animatable.View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Example of Collapsible/Accordion/Expandable List View in React
                        Native
                    </Text>

                    {/*Code for Single Collapsible Start*/}
                    <TouchableOpacity onPress={toggleExpanded}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Single Collapsible</Text>
                            {/*Heading of Single Collapsible*/}
                        </View>
                    </TouchableOpacity>
                    {/*Content of Single Collapsible*/}
                    <Collapsible collapsed={collapsed} align="center">
                        <View style={styles.content}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>
                                This is a dummy text of Single Collapsible View
                            </Text>
                        </View>
                    </Collapsible>
                    {/*Code for Single Collapsible Ends*/}

                    <View style={{ backgroundColor: '#000', height: 1, marginTop: 10 }} />
                    <View style={styles.multipleToggle}>
                        <Text style={styles.multipleToggle__title}>
                            Multiple Expand Allowed?
                        </Text>
                        <Switch
                            value={multipleSelect}
                            onValueChange={(multipleSelect) =>
                                setMultipleSelect(multipleSelect)
                            }
                        />
                    </View>
                    <Text style={styles.selectTitle}>
                        Please select below option to expand
                    </Text>

                    {/*Code for Selector starts here*/}
                    <View style={styles.selectors}>
                        {SELECTORS.map((selector) => (
                            <TouchableOpacity
                                key={selector.title}
                                onPress={() => setSections([selector.value])}
                                //on Press of any selector sending the selector value to
                                // setSections function which will expand the Accordion accordingly
                            >
                                <View style={styles.selector}>
                                    <Text
                                        style={
                                            activeSections.includes(selector.value) ?
                                            styles.activeSelector : { color: 'white' }
                                        }>
                                        {selector.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/*Code for Selector ends here*/}

                    {/*Code for Accordion/Expandable List starts here*/}
                    <Accordion
                        activeSections={activeSections}
                        //for any default active section
                        sections={CONTENT}
                        //title and content of accordion
                        touchableComponent={TouchableOpacity}
                        //which type of touchable component you want
                        //It can be the following Touchables
                        //TouchableHighlight, TouchableNativeFeedback
                        //TouchableOpacity , TouchableWithoutFeedback
                        expandMultiple={multipleSelect}
                        //Do you want to expand mutiple at a time or single at a time
                        renderHeader={renderHeader}
                        //Header Component(View) to render
                        renderContent={renderContent}
                        //Content Component(View) to render
                        duration={400}
                        //Duration for Collapse and expand
                        onChange={setSections}
                        //setting the state of active sections
                    />
                    {/*Code for Accordion/Expandable List ends here*/}
                </ScrollView>
            </View>
        </View>
    );
};

export default Config;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#22272EF2',
        paddingTop: 30,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#22272EF2',
        padding: 10,
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#22272EF2',
        color: 'white',
    },
    active: {
        backgroundColor: '#22272EF2',
        color: 'white',
    },
    inactive: {
        backgroundColor: '#22272EF2',
        color: 'white',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#22272EF2',
        color: 'white',
        padding: 10,
    },
    activeSelector: {
        color: 'blue',
        fontWeight: 'bold',
    },
    selectTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        color: 'white',
        marginRight: 8,
    },
});
