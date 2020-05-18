import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentDidMount() {
        firebase.initializeApp({
            apiKey: "xxxxxxxxxxxxxxxxxx",
            authDomain: "auth-68b0e.firebaseapp.com",
            databaseURL: "https://auth-68b0e.firebaseio.com",
            projectId: "auth-68b0e",
            storageBucket: "auth-68b0e.appspot.com",
            messagingSenderId: "418694389165",
            appId: "1:418694389165:web:821bed581d17144a701524"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                    </Button>
                    </CardSection>
                    );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }


    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {};

export default App;
