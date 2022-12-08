import { StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import AuthNav from './src/navigations/AuthNav';
import { store } from './src/utils/store';

export default function App() {
  return (
    <Provider store={store}>
      <AuthNav/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
