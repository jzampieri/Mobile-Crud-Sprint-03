import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import * as API from '../api';
import { Item } from '../types/Item';
import Loading from '../components/Loading';

export default function DetailScreen(){
  const route = useRoute<RouteProp<RootStackParamList,'Detail'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [item, setItem] = useState<Item|undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      const data = await API.getItem(route.params.id);
      setItem(data); setLoading(false);
    })();
  },[route.params.id]);

  if (loading || !item) return <Loading/>;

  return (
    <View style={{padding:16, gap:12}}>
      <Text style={{fontSize:22, fontWeight:'bold'}}>{item.title}</Text>
      {item.description ? <Text>{item.description}</Text> : null}
      <Text>Status: {item.done ? 'Concluído' : 'Em aberto'}</Text>
      <Text>Criado em: {new Date(item.createdAt).toLocaleString()}</Text>

      <Pressable onPress={()=> nav.navigate('Form', { id: item.id })} style={{backgroundColor:'#111', padding:12, borderRadius:10}}>
        <Text style={{color:'#fff', textAlign:'center'}}>Editar</Text>
      </Pressable>

      <Pressable
        onPress={async ()=>{
          Alert.alert('Excluir', 'Tem certeza?', [
            { text:'Cancelar', style:'cancel' },
            { text:'Excluir', style:'destructive', onPress: async ()=>{ await API.deleteItem(item.id); nav.navigate('List'); } }
          ]);
        }}
        style={{padding:12, borderRadius:10, borderWidth:1, borderColor:'#d00'}}
      >
        <Text style={{color:'#d00', textAlign:'center'}}>Excluir</Text>
      </Pressable>
    </View>
  );
}
