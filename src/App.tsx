import AuthProvider from "./providers/Auth";
import Router from "./components/Router";
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
