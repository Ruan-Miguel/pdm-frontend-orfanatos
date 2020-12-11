import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import OrphanageData from "./pages/CreateOrphanages/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanages/SelectMapPosition";

import Header from "./components/Header";

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name='OrphanagesMap' component={OrphanagesMap}></Screen>
        <Screen
          name='OrphanageDetails'
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header title='Orfanato' showX={false} />
          }}
        ></Screen>
        <Screen
          name='OrphanageData'
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title='Selecione o Mapa' />
          }}
        ></Screen>
        <Screen
          name='SelectMapPosition'
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title='Informe os dados' />
          }}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;