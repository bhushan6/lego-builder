/* eslint-disable react/prop-types */
import * as Form from "@radix-ui/react-form";
import "./styles.css";
import { useRef } from "react";
import { useStore } from "../../../store";

const JoinRoomForm = ({ setRoomId }) => {
  const form = useRef();

  const name = useRef();
  const room = useRef();

  const setSelfName = useStore((state) => state.setSelfName);

  const submit = (e) => {
    e.preventDefault();
    setSelfName(name.current);
    setRoomId(room.current);
  };

  return (
    <Form.Root ref={form} className="FormRoot" onSubmit={submit}>
      <Form.Field className="FormField" name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Name</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your Name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="text"
            required
            onChange={(e) => {
              name.current = e.target.value;
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="question">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Room ID</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a room ID
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="text"
            required
            onChange={(e) => {
              room.current = e.target.value;
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="FormButton" style={{ marginTop: 10 }}>
          Enter In Room
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export const JoinRoomScreen = ({ setRoomId }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <JoinRoomForm setRoomId={setRoomId} />
    </div>
  );
};
