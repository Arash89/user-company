import AppContainer from "./components/AppContainer";
import styles from './App.module.scss'

function App({ gql, client }) {
  return (
    <div className={styles.App}>
      <AppContainer />
    </div>
  );
}

export default App;
