import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import * as API from '../api';
import Loading from '../components/Loading';

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().optional(),
});

type Form = z.infer<typeof schema>;

export default function FormScreen(){
  const route = useRoute<RouteProp<RootStackParamList,'Form'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const id = route.params?.id;
  const { control, handleSubmit, setValue, formState:{errors} } = useForm<Form>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState<boolean>(!!id);

  useEffect(()=>{
    (async ()=>{
      if(!id) return;
      const item = await API.getItem(id);
      setValue('title', item.title);
      setValue('description', item.description ?? '');
      setLoading(false);
    })();
  },[id]);

  const onSubmit = async (data: Form)=>{
    if (!id) {
      await API.createItem({ title: data.title, description: data.description, done: false });
    } else {
      await API.updateItem(id, { title: data.title, description: data.description });
    }
    nav.navigate('List');
  };

  if (loading) return <Loading/>;

  return (
    <View style={{padding:16, gap:12}}>
      <Text>Título</Text>
      <TextInput
        onChangeText={(t)=>setValue('title', t, { shouldValidate:true })}
        placeholder="Ex.: Comprar materiais"
        style={{borderWidth:1, borderColor:'#ccc', padding:12, borderRadius:8}}
      />
      {errors.title && <Text style={{color:'red'}}>{errors.title.message}</Text>}

      <Text>Descrição (opcional)</Text>
      <TextInput
        onChangeText={(t)=>setValue('description', t)}
        placeholder="Detalhes"
        style={{borderWidth:1, borderColor:'#ccc', padding:12, borderRadius:8}}
      />

      <Pressable onPress={handleSubmit(onSubmit)} style={{backgroundColor:'#111', padding:16, borderRadius:12, marginTop:8}}>
        <Text style={{color:'#fff', textAlign:'center', fontWeight:'bold'}}>{id ? 'Salvar alterações' : 'Criar'}</Text>
      </Pressable>
    </View>
  );
}
