import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class ProjectsListScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params } = navigation.state;

        return {
            title: `${params.headerTitle}'s Details`,
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name="chevron-left"
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                /* this only styles the title/text (font, color etc.)  */
                color: 'white'
            },
            headerStyle: {
                /* this will style the header, but does NOT change the text */
                backgroundColor: '#496FC2'
            }
        }
    };

    _renderProjectType = () => {
        const { projectData } = this.props.navigation.state.params;
        // console.log('projectData', projectData);

        const projectCat = this.props.projectCategories.filter((category) => category.id == projectData.category_id)
        const rightTitle = (projectCat[0] && projectCat[0].name) || 'Not set';

        return (
            <View style={[styles.mt30]}>
                <ListItem
                    hideChevron={true}
                    rightTitle={rightTitle}
                    title="Project's type"
                    titleStyle={[styles.listItemTitleStyle]}
                    containerStyle={[styles.listItem, styles.listItemBorder]}
                />
            </View>
        );
    };

    _renderClient = () => {
        const { projectData } = this.props.navigation.state.params;

        const clients = this.props.clients.items.filter((client) => client.id == projectData.client_id)
        const rightTitle = (clients[0] && clients[0].searchStr) || 'Not set';

        return (
            <View>
                <ListItem
                    hideChevron={true}
                    rightTitle={rightTitle}
                    title="Client"
                    titleStyle={[styles.listItemTitleStyle]}
                    containerStyle={[styles.listItem]}
                />
            </View>
        );
    };

    render() {
        
        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView style={{
                    backgroundColor: '#f7f7f7',
                    paddingTop: 30
                }}>
                    {this._renderProjectType()}
                    {this._renderClient()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 35
    },
    modalHeader: {
        marginTop: 30,
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20
    },
    modalCheckboxContainer: {
        borderWidth: 0,
        backgroundColor: "white",
        marginBottom: 0,
        paddingBottom: 0
    },
    modalCheckboxSubtitleContainer: {
        marginLeft: 55
    },
    modalCheckboxSubtitle: {
        color: 'gray'
    },
    modalCheckboxWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 10
    },

    listItem: {
        backgroundColor: 'white',
        borderTopColor: '#eaeaea',
        borderBottomColor: '#eaeaea',
    },
    listItemBorder: {
        borderTopWidth: 1
    },
    listItemTitleStyle: {
        fontSize: 18
    },
    mt30: {
        marginTop: 30
    },

    timerWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    timerText: {
        fontFamily: 'digital-7-italic',
        fontSize: 60,
        fontWeight: 'bold'
    },
    colorWhite: {
        color: 'white'
    },
    colorBlack: {
        color: 'black'
    },

    photoScrollView: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    photoChooseBtnWrapper: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },

    textInputWrapper: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15
    }
});

function mapStateToProps({ projectCategories, clients }) {
    return {
        projectCategories,
        clients
    }
}

export default connect(mapStateToProps)(ProjectsListScreen);