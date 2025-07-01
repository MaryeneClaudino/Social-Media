import { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, Alert, Image, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '../services/api';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir o acesso a sua galeria de fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir o acesso à câmera.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !content || !image) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('foto', {
        uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
        name: filename,
        type,
      });

      console.log('FormData criado:', formData);

      await createPost(formData);
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      setTitle('');
      setContent('');
      setImage(null);
      navigation.goBack();
    } catch (e) {
      console.log('Erro detalhado:', e?.response?.data, e?.message, e);
      const msg = e?.response?.data?.message || e?.response?.data?.error || 'Erro ao criar post';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar novo post</Text>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.box}
      />

      <TextInput
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        style={[styles.box, styles.heightBoxConteudo]}
        multiline
      />

      <View style={styles.imageButtons}>
        <TouchableOpacity
          onPress={pickImage}
          style={[styles.selectImg, { width: '48%' }]}
        >
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
            Galeria
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={takePhoto}
          style={[styles.selectImg, { width: '48%' }]}
        >
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
            Câmera
          </Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginVertical: 8, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        onPress={handleCreatePost}
        disabled={loading}
        style={styles.createPost}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Criar Post</Text>
        )}
      </TouchableOpacity>

      {navigation && (
        <View style={styles.cancel}><Button title="Cancelar" onPress={() => navigation.goBack()} color="#dc2626" /></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: '#fcf2f8'
  },
  title: {
    marginTop: 30,
    fontSize: 28,
    marginBottom: 20,
    color: '#AA0060',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  box: {
    borderWidth: 2,
    width: '95%',
    margin: 25,
    padding: 6,
    borderRadius: 7,
    borderColor: '#005088',
    marginBottom: 10
  },
  heightBoxConteudo: {
    height: 100
  },
  cancel: {
    width: 150,
    marginTop: 45
  },
  createPost: {
    backgroundColor: '#0095FE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    width: '95%'
  },
  selectImg: {
    backgroundColor: '#FD29A1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#D50078',
    width: '95%'
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginVertical: 8
  }
});

export default CreatePostScreen;