import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { verifyInstallation } from 'nativewind';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  verifyInstallation();

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}