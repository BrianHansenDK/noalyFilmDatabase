import React from 'react';
import Home from '../Screens/Home';
import Detail from '../Screens/Detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './Navbar';
import Search from '../Screens/Search';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
    state = {}
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name={'Hjem'} component={Home} options={{
                        headerTransparent: true,
                        header: ({ navigation }) => <Navbar navigation={navigation} main={true} />,
                    }}
                />
                <Stack.Screen
                    name={'Detaljer'} component={Detail} options={{
                        headerTransparent: true,
                        header: ({ navigation }) => <Navbar navigation={navigation} />,
                    }}
                />
                <Stack.Screen
                    name={'Søg'} component={Search}
                    options={{
                        headerTransparent: true,
                        header: ({ navigation }) => <Navbar navigation={navigation} />,
                    }}
                />
            </Stack.Navigator>
        );
    }
}

export default MainNavigation;
