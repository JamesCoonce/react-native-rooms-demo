import React from 'react';
import { ScrollView, StyleSheet, FlatList, Text, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      cleans: [],
      error: null,
      loggedIn: false
    }
  }
  async componentDidMount(){
    try {
      let token = await AsyncStorage.getItem("token");
      await this.getRecentCleans(token);
      this.setState({loggedIn: true });
    } catch {
      this.setState({ loggedIn: false });
    }
  }
  
  getRecentCleans = async (token) => {
    try{
      let cleans = await fetch('https://pilot.readylist.com/mobile/get_recent_cleans.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "jwt": token
        })
      }).then(res => res.json());
      this.setState({cleans: cleans.recent_cleans});
    } catch(error){
      alert(error.message)
    }
  }

  render() {
    return (
      <ScrollView style = { styles.container } >
        {/**
        * Go ahead and delete ExpoLinksView and replace it with your content;
        * we just wanted to provide you with some helpful links.
        */}
        { !this.state.loggedIn ? (
          <Text>Please Login!</Text>
        ): (
            <FlatList
              data={this.state.cleans}
              renderItem={({ item }) => (
                <>
                  <Text>{item.room}</Text>
                  <Text>{item.inspector}</Text>
                </>
              )}
            />
        )}
      </ScrollView>
    );
  }
}
  
  


LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
