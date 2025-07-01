import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View className="items-center mb-8">
        <Text style={styles.title}>
          Bem-vindo, {user?.name || user?.email || 'Usuário'}!
        </Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.widthButton}><Button title="Listar postagens" onPress={() => navigation.navigate('PostList')} /></View>
        <View style={styles.widthButton}><Button title="Listar usuários" onPress={() => navigation.navigate('UserList')} /></View>
        <View style={styles.widthButton}><Button title="Criar post" onPress={() => navigation.navigate('CreatePost')} /></View>
        <View style={styles.widthButton}><Button title="Meus posts" onPress={() => navigation.navigate('MyPosts')} /></View>

        <View style={styles.logout}><Button title="Logout" onPress={logout} color="#dc2626" /></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#AA0060',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fcf2f8'
  },
  widthButton: {
    width: 250
  },
  logout: {
    width: 100,
    marginTop: 60
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    gap: 25,
    marginTop: 30,
  }
});