import { Text, View } from 'react-native';
import { Link } from 'expo-router';

const Home: React.FC = () => {

  return (
    <View className="flex-1 justify-center items-center gap-y-3">
      <Text>Home</Text>
      <View className="bg-neutral-300 p-3 rounded-xl">
        <Link href="/screens/Login">Voltar</Link>
      </View>
    </View>
  );
  
};

export default Home;