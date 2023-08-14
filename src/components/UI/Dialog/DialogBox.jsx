/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import "./dialogbox.css";

export const DialogBox = () => (
  <Dialog.Root defaultOpen={true}>
    <Dialog.Trigger asChild>
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "white",
          zIndex: "1000000000",
        }}
        className="Button violet"
      >
        <InfoCircledIcon color="black" transform="scale(2)" />
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Manual</Dialog.Title>
        <Dialog.Description className="DialogDescription" asChild>
          <ul>
            <li>Use control panel to change the properties of brick</li>
            <li>
              You change the pivot point of bricks using{" "}
              <span className="key">A</span> <span className="key">S</span>{" "}
              <span className="key">W</span> and <span className="key">D</span>{" "}
              keys or You can use <strong>anchorX</strong> and{" "}
              <strong>anchorY</strong> option from the control panel
            </li>
            <li>
              To delete brick, select <strong>Edit</strong> option in control
              panel then select brick by clicking on brick or hold{" "}
              <span className="key">Shift</span> to select multiple bricks and
              use
              <span className="key">Delete</span> to delete selected bricks
            </li>
          </ul>
        </Dialog.Description>

        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
