import {
  StyleSheet, 
} from 'react-native';



//Estilo del contenedor principal de la pantalla
export const common_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

// Se establecen estilos comunes para las pantallas principales de la aplicación, como HomeScreen y FavoriteDeviceScreen.
export const main_styles = StyleSheet.create({
 header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 32,
    color: '#666',
    textAlign: 'center',
  },

  fab: {
    position: 'absolute',

    right: 20,
    bottom: 20,

    width: 60,
    height: 60,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#007AFF',
  },
});