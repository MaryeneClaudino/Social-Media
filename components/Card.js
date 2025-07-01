import { View } from 'react-native';

export const Card = ({ children }) => {
  return (
    <View className="mb-4 bg-white rounded-lg overflow-hidden shadow">
      {children}
    </View>
  )
}