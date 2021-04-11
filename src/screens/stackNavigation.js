import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { IpartyScreen, LoginScreen, SignUpScreen } from "./index";
import TabNavigation from "./tabNavigation";

import { AuthContext } from "../components/dados/context";
import { darkBlue } from "../styles/color";

const Stack = createStackNavigator();

function App() {
  const [isUserCurrent, setIsUserCurrent] = useState(false);

  const authContext = useMemo(() => ({
    signIn: () => {
      setIsUserCurrent(true);
    },
    signUp: () => {
      setIsUserCurrent(true);
    },
    signOut: () => {
      setIsUserCurrent(false);
    }
  }), [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login"
          screenOptions={{
            cardStyle: { backgroundColor: darkBlue }
          }}
        >
          {!isUserCurrent ? (
            <>
              <Stack.Screen
                name="iparty"
                component={IpartyScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="signUp"
                component={SignUpScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="tabNavigation"
                component={TabNavigation}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;