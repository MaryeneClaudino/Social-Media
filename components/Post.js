import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

function isValidUrl(url) {
  return typeof url === 'string' && url.startsWith('http');
}

export default function Post({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <>
      {isValidUrl(post.imageId) && (
        <Image source={{ uri: post.imageId }} style={{ width: '100%', height: 200, backgroundColor: '#eee' }} resizeMode="cover" />
      )}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{post.title}</Text>
        <Text style={{ color: '#AA0060', fontSize: 14, marginBottom: 4 }}>
          {post.author?.name || 'Autor desconhecido'}
        </Text>
        <Text style={{ color: '#444', marginBottom: 8 }}>{post.content}</Text>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Text style={{ fontSize: 20, color: liked ? 'red' : '#888' }}>
            {liked ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}