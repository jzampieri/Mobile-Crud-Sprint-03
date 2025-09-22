import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import FormScreen from '../screens/FormScreen';
import DetailScreen from '../screens/DetailScreen';

export type RootStackParamList = {
  List: undefined;
  Form: { id?: string } | undefined;
  Detail: { id: string };
}
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Itens' }}/>
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Novo/Editar' }}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
