/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useStore } from "../../store";
import { memo, useRef, useEffect } from "react";
import { BorderPlane } from "./BorderPlane";

const Other = memo(function Other({ id, color }) {
  const room = useStore((state) => state.liveblocks.room);

  const ref = useRef();

  useEffect(() => {
    const unsubscribe = room.subscribe("event", ({ event }) => {
      if (event.type === id) {
        const d = event.data;
        ref.current.container.position.x = d.x;
        ref.current.container.position.z = d.z;
        ref.current.container.position.y = d.y - 31 / 2;

        ref.current.plane.scale.set(d.w, d.d);
        ref.current.plane.material.uniforms.uSize.value.x = d.w;
        ref.current.plane.material.uniforms.uSize.value.y = d.d;
        ref.current.plane.material.uniforms.uBorderWidth.value =
          (Math.min(d.w, d.d) / 50) * 10;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, room]);

  return (
    <>
      <BorderPlane planeSize={[25, 25]} ref={ref} color={color} />
    </>
  );
});

export const Others = () => {
  const others = useStore((state) => state.liveblocks.others);

  return (
    <>
      {others.map((user) => {
        console.log(user);
        return user.presence?.self ? (
          <Other
            key={user.presence.self.id}
            id={user.presence.self.id}
            color={user.presence.self.color}
          />
        ) : null;
      })}
    </>
  );
};
