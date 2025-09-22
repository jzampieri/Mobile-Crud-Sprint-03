import { useItems } from '../hooks/useItems';
import Loading from '../components/Loading';
import ErrorView from '../components/ErrorView';
import EmptyState from '../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, Pressable, RefreshControl, Text, View } from 'react-native';

export default function ListScreen(){
  const { items, loading, error, fetchAll, remove, update } = useItems();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (loading && items.length === 0) return <Loading/>;
  return (
    <View style={{flex:1}}>
      {error && <ErrorView msg={error}/>}
      <FlatList
        data={items}
        keyExtractor={(it)=>it.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchAll}/>}
        ListEmptyComponent={<EmptyState/>}
        renderItem={({item}) => (
          <Pressable
            onLongPress={()=> remove(item.id)}
            onPress={()=> nav.navigate('Detail', { id: item.id })}
            style={{padding:16, borderBottomWidth:1, borderColor:'#eee', backgroundColor:'#fff'}}
          >
            <Text style={{fontWeight:'bold'}}>{item.title}</Text>
            {item.description ? <Text>{item.description}</Text> : null}
            <Pressable onPress={()=>update(item.id, { done: !item.done })}>
              <Text style={{marginTop:6}}>{item.done ? '✅ Concluído' : '⬜ Em aberto'}</Text>
            </Pressable>
          </Pressable>
        )}
      />
      <Pressable
        onPress={()=> nav.navigate('Form')}
        style={{position:'absolute', right:16, bottom:16, backgroundColor:'#111', padding:16, borderRadius:999}}
      >
        <Text style={{color:'#fff', fontWeight:'bold'}}>+ Novo</Text>
      </Pressable>
    </View>
  );
}
