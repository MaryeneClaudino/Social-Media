import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import { getMyPosts, deletePost } from '../services/api';
import { Card } from '../components/Card';
import Post from '../components/Post';

const MyPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getMyPosts();
      setPosts(data.posts || data || []);
    } catch (e) {
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = (postId) => {
    Alert.alert(
      'Deletar Post',
      'Tem certeza que deseja deletar este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(postId);
              setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
              Alert.alert('Sucesso', 'Post deletado com sucesso.');
            } catch (e) {
              Alert.alert('Erro', 'Não foi possível deletar o post.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card>
            <Post post={item} />
            <Button
              title="Deletar"
              color="#dc2626"
              onPress={() => handleDelete(item.id)}
            />
          </Card>
        )}
        ListEmptyComponent={<Text>Nenhum post encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fcf2f8',
    marginBottom: 30

  },
});

export default MyPostsScreen;