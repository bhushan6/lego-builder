/* eslint-disable react/prop-types */
import "./style.css";
import * as Popover from "@radix-ui/react-popover";
import { PersonIcon } from "@radix-ui/react-icons";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useStore } from "../../../store";

const Person = ({ color = "#ff0000", name = "" }) => {
  return (
    <div className="PeopleListItem">
      <div className="ColorBadge" style={{ background: color }}></div>
      <h3 className="name">{name}</h3>
    </div>
  );
};

const s = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const PeopleList = () => {
  const others = useStore((state) => state.liveblocks.others);

  const NoOfPeoples = others.length;

  return (
    <ScrollArea.Root className="PeopleList ScrollAreaRoot">
      <ScrollArea.Viewport
        className="ScrollAreaViewport"
        style={NoOfPeoples < 1 ? s : {}}
      >
        {NoOfPeoples < 1 && (
          <h3 style={{ textAlign: "center", padding: "6px", fontSize: "14px" }}>
            No one else in room
          </h3>
        )}
        {others.map((user) => {
          return user.presence?.self ? (
            <Person
              key={user.presence.self.id}
              color={user.presence.self.color}
              name={user.presence.self.name}
            />
          ) : null;
        })}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
};

export const PopoverPeopleList = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="Button violet" aria-label="Connected People List">
        <PersonIcon className="Icon" color="black" />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>
        <PeopleList />
        {/* <Popover.Close className="PopoverClose" aria-label="Close">
          <Cross2Icon />
        </Popover.Close> */}
        {/* <Popover.Arrow className="PopoverArrow" /> */}
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
