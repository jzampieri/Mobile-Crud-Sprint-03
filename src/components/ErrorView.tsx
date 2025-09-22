import { Text, View } from 'react-native';
export default function ErrorView({msg}:{msg:string}) {
  return <View style={{padding:16}}><Text style={{color:'red'}}>{msg}</Text></View>;
}
