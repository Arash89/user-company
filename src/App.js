import './App.css';
import AppContainer from "./components/AppContainer";

function App({ gql, client }) {
  return (
    <div className="App">
      <AppContainer gql={gql} client={client} />
    </div>
  );
}

export default App;
