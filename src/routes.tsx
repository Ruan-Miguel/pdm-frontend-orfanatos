import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name='OrphanagesMap' component={OrphanagesMap}></Screen>
        <Screen name='OrphanageDetails' component={OrphanageDetails}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;