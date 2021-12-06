import AppContainer from "./components/AppContainer";
import styles from './App.module.scss'

function App({ gql, client }) {
  return (
    <div className={styles.App}>
      <AppContainer gql={gql} client={client} />
    </div>
  );
}

export default App;
