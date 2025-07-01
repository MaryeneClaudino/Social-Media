import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { getUsers } from '../services/api';

const PAGE_SIZE = 50;

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const { data } = await getUsers({ page: pageToFetch, limit: PAGE_SIZE });
      setUsers(data.users || []);
      if (data.total) {
        setTotalPages(Math.ceil(data.total / PAGE_SIZE));
      } else {
        setTotalPages(data.users && data.users.length === PAGE_SIZE ? pageToFetch + 1 : pageToFetch);
      }
      setPage(pageToFetch);
    } catch (e) {
      setUsers([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, { flex: 1.2 }]}>Nome</Text>
      <Text style={[styles.headerCell, { flex: 2 }]}>E-mail</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 1.2 }]} numberOfLines={1}>{item.name}</Text>
      <Text style={[styles.cell, { flex: 2 }]} numberOfLines={1}>{item.email}</Text>
    </View>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.pageButton,
            page === i && styles.pageButtonActive
          ]}
          onPress={() => fetchUsers(i)}
        >
          <Text style={page === i ? styles.pageButtonTextActive : styles.pageButtonText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.paginationContainer}>
        {buttons}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.email}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={!loading && <Text>Nenhum usuário encontrado.</Text>}
        ListFooterComponent={
          loading
            ? <ActivityIndicator style={{ margin: 16 }} />
            : renderPagination()
        }
        refreshing={loading}
        onRefresh={() => fetchUsers(1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#AA0060',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fcf2f8',
    marginBottom: 30
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#0095FE',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#eff7fd',
    borderBottomWidth: 1,
    borderColor: '#005088',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  cell: {
    color: '#222',
    fontSize: 15,
    paddingHorizontal: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    flexWrap: 'wrap',
    gap: 4,
  },
  pageButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  pageButtonActive: {
    backgroundColor: '#2563eb',
  },
  pageButtonText: {
    color: '#222',
    fontWeight: 'bold',
  },
  pageButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserListScreen;