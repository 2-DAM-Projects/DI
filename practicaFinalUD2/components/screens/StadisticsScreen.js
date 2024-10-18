import * as  React from 'react';
import {Text, View, Button} from 'react-native';

function StadisticsScreen (){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Stadistics Screen</Text>
        <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      </View>
    )  
};

export default StadisticsScreen;