/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Brick,
  BrickCursor,
  Lights,
  Workspace,
  BrickOutline,
  DeleteBrick,
  Select,
  useSetSelection,
} from ".";
import { Vector3, Box3 } from "three";
import {
  uID,
  getMeasurementsFromDimensions,
  base,
  useAnchorShorcuts,
  minWorkSpaceSize,
} from "../../utils";
import { button, useControls } from "leva";
import { ChangeColor } from "./ChangeColor";

export const Scene = () => {
  const [bricks, setBricks] = useState([]);

  const minWorkSpaceSizeRef = useRef(minWorkSpaceSize);

  const [workspaceSize, setWorkspaceSize] = useState(minWorkSpaceSize);

  const bricksBoundBox = useRef([]);

  const brickCursorRef = useRef();

  const box = useMemo(() => new Box3(), []);

  const [{ width, depth, rotate, color, anchorX, anchorZ, Edit }, set] =
    useControls(() => ({
      width: {
        value: 1,
        min: 1,
        max: 5,
        step: 1,
      },
      depth: {
        value: 1,
        min: 1,
        max: 5,
        step: 1,
      },
      rotate: false,
      color: "#ff0",
      anchorX: {
        value: 0,
        min: -2,
        max: 2,
        step: 1,
      },
      anchorZ: {
        value: 0,
        min: -2,
        max: 2,
        step: 1,
      },
      Undo: button((get) => {
        undoAddedBrick();
      }),
      Edit: false,
    }));

  useAnchorShorcuts(anchorX, anchorZ, set);

  const setSelection = useSetSelection();

  function undoAddedBrick() {
    setSelection({}); // this should unselect the bricks but Doesn't work for now because of undo is button within leva
    setBricks((prevBricks) => {
      prevBricks.pop();
      return [...prevBricks];
    });
  }

  const addBrick = (e) => {
    e.stopPropagation();

    if (Edit) return;

    if (!e.face?.normal || !e.point) return;

    if (!brickCursorRef.current) return;

    if (!isDrag.current) {
      const dimensions = getMeasurementsFromDimensions({
        x: width,
        z: depth,
      });
      const boundingBoxOfBrickToBeAdded = new Box3().setFromObject(
        brickCursorRef.current
      );

      const maxMax = Math.max(
        Math.abs(boundingBoxOfBrickToBeAdded.max.x * 2),
        Math.abs(boundingBoxOfBrickToBeAdded.max.z * 2)
      );
      const maxMin = Math.max(
        Math.abs(boundingBoxOfBrickToBeAdded.min.x * 2),
        Math.abs(boundingBoxOfBrickToBeAdded.min.z * 2)
      );

      const max = Math.max(maxMax, maxMin);

      minWorkSpaceSizeRef.current = Math.max(max, minWorkSpaceSizeRef.current);

      setWorkspaceSize((currentSize) => {
        if (currentSize <= max) {
          return max;
        }
        return currentSize;
      });

      let canCreate = true;

      for (let index = 0; index < bricksBoundBox.current.length; index++) {
        const brickBoundingBox = bricksBoundBox.current[index].brickBoundingBox;
        const collision =
          boundingBoxOfBrickToBeAdded.intersectsBox(brickBoundingBox);

        if (collision) {
          const dx = Math.abs(
            brickBoundingBox.max.x - boundingBoxOfBrickToBeAdded.max.x
          );
          const dz = Math.abs(
            brickBoundingBox.max.z - boundingBoxOfBrickToBeAdded.max.z
          );
          const yIntsersect =
            brickBoundingBox.max.y - 9 > boundingBoxOfBrickToBeAdded.min.y;
          if (
            yIntsersect &&
            dx !== dimensions.width &&
            dz !== dimensions.depth
          ) {
            canCreate = false;
            break;
          }
        }
      }

      if (canCreate) {
        const brickData = {
          intersect: { point: e.point, face: e.face },
          uID: uID(),
          dimensions: { x: width, z: depth },
          rotation: rotate ? Math.PI / 2 : 0,
          color: color,
          translation: { x: anchorX, z: anchorZ },
        };

        setBricks((prevBricks) => [...prevBricks, brickData]);
      }
    } else {
      isDrag.current = false;
    }
  };

  const setBrickCursorPosition = (e) => {
    e.stopPropagation();
    if (Edit) return;
    if (!brickCursorRef.current) return;

    const { height } = getMeasurementsFromDimensions({
      x: width,
      z: depth,
    });

    const evenWidth = !rotate ? width % 2 === 0 : depth % 2 === 0;
    const evenDepth = !rotate ? depth % 2 === 0 : width % 2 === 0;

    brickCursorRef.current.position
      .copy(new Vector3(e.point.x, Math.abs(e.point.y), e.point.z))
      .add(
        new Vector3(e.face.normal.x, Math.abs(e.face.normal.y), e.face.normal.z)
      )
      .divide(new Vector3(base, height, base))
      .floor()
      .multiply(new Vector3(base, height, base))
      .add(
        new Vector3(
          evenWidth ? base : base / 2,
          height / 2,
          evenDepth ? base : base / 2
        )
      );

    const bb = box.setFromObject(brickCursorRef.current);
    const max = bb.max.multiplyScalar(1 / base);
    const min = bb.min.multiplyScalar(1 / base);
    const brickXEnd = brickCursorRef.current.position.x > 0 ? max.x : min.x;
    const brickZEnd = brickCursorRef.current.position.z > 0 ? max.z : min.z;

    setWorkspaceSize((currentSize) => {
      const sizeDiff = Math.max(
        Math.abs(brickXEnd + anchorX) * base * 2 - currentSize,
        Math.abs(brickZEnd + anchorZ) * base * 2 - currentSize
      );
      if (sizeDiff > 0 || currentSize > minWorkSpaceSizeRef.current) {
        return currentSize + sizeDiff;
      }
      return currentSize;
    });
  };

  const onClick = (e) => {
    if (!Edit) addBrick(e);
  };

  const mouseMove = (e) => {
    setBrickCursorPosition(e);
  };

  const isDrag = useRef(false);
  const timeoutID = useRef(null);

  useEffect(() => {
    const pointerDown = () => {
      timeoutID.current && clearTimeout(timeoutID.current);
      timeoutID.current = setTimeout(() => {
        isDrag.current = true;
      }, 300);
    };

    const pointerUp = () => {
      timeoutID.current && clearTimeout(timeoutID.current);
    };

    window.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);

    return () => {
      window.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
    };
  }, []);

  return (
    <>
      <color attach="background" args={["#202025"]} />
      <Select enable={Edit} box multiple onChange={console.log}>
        {bricks.map((b, i) => {
          return (
            <Brick
              key={b.uID}
              {...b}
              onClick={onClick}
              bricksBoundBox={bricksBoundBox}
              mouseMove={mouseMove}
            />
          );
        })}
        <DeleteBrick setBricks={setBricks} />
        <BrickOutline />
        <ChangeColor color={color} setBricks={setBricks} />
      </Select>
      <Lights />
      <Workspace
        onClick={onClick}
        mouseMove={mouseMove}
        workspaceSize={workspaceSize}
      />
      <BrickCursor
        visible={Edit ? false : true}
        ref={brickCursorRef}
        rotation={rotate ? Math.PI / 2 : 0}
        dimensions={{ x: width, z: depth }}
        translation={{ x: anchorX, z: anchorZ }}
      />
    </>
  );
};
