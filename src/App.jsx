import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setToken } from "./features/songs/songsSlice";
import Login from "./pages/Login";
import Spoify from "./pages/Spoify";

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const getToken = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(setToken(getToken));
    }
    // window.location.hash = "";
  }, [dispatch]);

  return <div>{token ? <Spoify /> : <Login />}</div>;
};

export default App;
