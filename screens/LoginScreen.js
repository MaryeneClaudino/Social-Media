import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Preencha e-mail e senha.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Digite um e-mail válido.');
      return;
    }
    try {
      await login({ email, password });
    } catch (e) {
      const msg = e?.response?.data?.message || "Credenciais inválidas.";
      setErrorMsg(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Faça seu Login 🔑</Text>
      {errorMsg ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errorMsg}</Text>
      ) : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.box}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.box}
      />
      <View style={styles.flexButton} >
        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Cadastrar" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf2f8'
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#AA0060',
    fontWeight: 'bold'
  },
  flexButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    gap: 10,
    marginTop: 30,
  },
  box: {
    borderWidth: 2,
    width: 250,
    margin: 15,
    padding: 6,
    borderRadius: 7,
    borderColor: '#005088'
  }
});

export default LoginScreen;