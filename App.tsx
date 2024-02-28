import {Button, Text, View} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const [userData, setUserData] = useState('');
  const loginPress = () => {
    console.log('test');
  };
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>App</Text>
      <Button onPress={loginPress} title="Facebook Login " />
    </View>
  );
};

export default App;
