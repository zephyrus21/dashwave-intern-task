import { useEffect } from "react";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setToken } from "./features/songs/songsSlice";

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const getToken = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(setToken(getToken));
    }
  }, [dispatch]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
