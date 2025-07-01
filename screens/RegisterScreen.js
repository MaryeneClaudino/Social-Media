import { useState } from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import { registerUser } from "../services/api";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    setErrorMsg('');
    if (!name || !email || !password) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg("Digite um e-mail válido.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    try {
      await registerUser({ name, email, password });
      setErrorMsg('');
      navigation.navigate('Login');
    } catch (e) {
      const msg = e?.response?.data?.message || "Erro ao cadastrar. Verifique seus dados.";
      setErrorMsg(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      {errorMsg ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errorMsg}</Text>
      ) : null}
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.box}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
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
        <Button title="Cadastrar" onPress={handleRegister} />
        <Button title="Voltar ao Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#AA0060',
    fontWeight: 'bold'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: '#fcf2f8'
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

export default RegisterScreen;