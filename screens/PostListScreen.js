import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getPosts } from '../services/api';
import { Card } from '../components/Card';
import Post from '../components/Post';

const PAGE_SIZE = 10;

const PostListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (nextPage = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { data } = await getPosts({ page: nextPage, limit: PAGE_SIZE });
      if (data.posts && data.posts.length > 0) {
        setPosts(prev => nextPage === 1 ? data.posts : [...prev, ...data.posts]);
        setHasMore(data.posts.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      if (nextPage === 1) setPosts([]);
      setHasMore(false);
    }
    setLoading(false);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts(page + 1);
      setPage(prev => prev + 1);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchPosts(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card>
            <Post post={item} />
          </Card>
        )}
        ListEmptyComponent={!loading && <Text>Nenhum post encontrado.</Text>}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={handleRefresh}
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
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#AA0060',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default PostListScreen;