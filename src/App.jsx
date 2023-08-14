/* eslint-disable react/prop-types */
import "./App.css";
import { useEffect, useState } from "react";
import { LegoRoom } from "./components/3D";
import { useStore } from "./store";
import { Loader } from "./components/UI/Loader";
import { JoinRoomScreen } from "./components/UI/JoinRoomForm";

const CONNECTED = "connected";

const Lobby = ({ roomId }) => {
  const enterRoom = useStore((state) => state.liveblocks.enterRoom);
  const leaveRoom = useStore((state) => state.liveblocks.leaveRoom);
  const status = useStore((state) => state.liveblocks.status);

  useEffect(() => {
    enterRoom(roomId);

    return () => leaveRoom(roomId, { bricks: [] });
  }, [enterRoom, leaveRoom, roomId]);

  if (status !== CONNECTED) {
    return <Loader status={status} />;
  }

  return <LegoRoom />;
};

function App() {
  const [roomId, setRoomId] = useState(null);

  return (
    <div className="App">
      {roomId ? (
        <Lobby roomId={roomId} />
      ) : (
        <JoinRoomScreen setRoomId={setRoomId} />
      )}
    </div>
  );
}

export default App;
