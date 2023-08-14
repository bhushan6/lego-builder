/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useStore } from "../../store";
import { memo, useRef, useEffect } from "react";
import { BorderPlane } from "./BorderPlane";
import { base } from "../../utils";

const Other = memo(function Other({ id, otherCurors }) {
  const room = useStore((state) => state.liveblocks.room);

  const ref = useRef();

  useEffect(() => {
    const unsubscribe = room.subscribe("event", ({ event }) => {
      if (event.type === id) {
        const d = event.data;
        ref.current.position.x = d.x;
        ref.current.position.z = d.z;
        ref.current.position.y = d.y - 31 / 2;

        ref.current.scale.set(d.w, d.d);
        ref.current.material.uniforms.uSize.value.x = d.w;
        ref.current.material.uniforms.uSize.value.y = d.d;
        ref.current.material.uniforms.uBorderWidth.value =
          (Math.min(d.w, d.d) / 50) * 5;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, room]);

  return (
    <>
      <BorderPlane planeSize={[25, 25]} ref={ref} color={"#ff0000"} />
    </>
  );
});

export const Others = () => {
  const others = useStore((state) => state.liveblocks.others);

  return (
    <>
      {others.map((user) => {
        return user.presence?.self ? (
          <Other key={user.presence.self.id} id={user.presence.self.id} />
        ) : null;
      })}
    </>
  );
};
