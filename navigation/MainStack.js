import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PostListScreen from '../screens/PostListScreen';
import UserListScreen from '../screens/UserListScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import MyPostsScreen from '../screens/MyPostsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="PostList" component={PostListScreen} options={{ title: 'Postagens' }} />
    <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Usuários' }} />
    <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Criar Post' }} />
    <Stack.Screen name="MyPosts" component={MyPostsScreen} options={{ title: 'Meus Posts' }} />
  </Stack.Navigator>
);

export default MainStack;