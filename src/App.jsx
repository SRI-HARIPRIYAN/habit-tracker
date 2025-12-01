import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <div className="bg-background select-none">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
};

export default App;
