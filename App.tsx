import {Button, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin , statusCodes } from '@react-native-google-signin/google-signin';

const App = () => {
 
  
  const [userData, setUserData] = useState(null);
  // login with Google
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1070730435074-cvp1jmam7mci9p7q92uro2450emmefba.apps.googleusercontent.com',
    });
  }, []);
  // google login Press
 
   const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  const FacebookLoginPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Social Auth</Text>
      <View style={{marginTop: 12}}>
        <Button
          onPress={() => {
            FacebookLoginPress()
              .then(res => {
                console.log('res', res);
                // setUserData(res)
              })
              .catch(err => {
                console.log('err', err);
              });
          }}
          title="Facebook Login "
        />
      </View>
      <View style={{marginTop: 12}}>
        <Button
          onPress={() => {
            onGoogleButtonPress()
              .then(res => {
                console.log('res', res);
                // setUserData(res)
              })
              .catch(err => {
                console.log('my console error', err);
              });
          }}
          title="Google Login "
        />
      </View>
    </View>
  );
};

export default App;
