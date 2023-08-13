import "./App.css";
import { useEffect } from "react";
import { LegoRoom } from "./components/3D";
import { useStore } from "./store";
import { Loader } from "./components/UI/Loader";

const CONNECTED = "connected";

function App() {
  const enterRoom = useStore((state) => state.liveblocks.enterRoom);
  const leaveRoom = useStore((state) => state.liveblocks.leaveRoom);
  const status = useStore((state) => state.liveblocks.status);

  useEffect(() => {
    enterRoom("lego-test-room");

    return () => leaveRoom("lego-test-room", { bricks: [] });
  }, [enterRoom, leaveRoom]);

  if (status !== CONNECTED) {
    return <Loader />;
  }

  return (
    <div className="App">
      <LegoRoom />
    </div>
  );
}

export default App;
