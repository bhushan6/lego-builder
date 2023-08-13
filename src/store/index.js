import { create } from "zustand";
import { CREATE_MODE, defaultAnchor, defaultWidth } from "../utils";

export const useStore = create((set) => ({
  mode: CREATE_MODE,
  setMode: (newMode) => set({ mode: newMode }),

  width: defaultWidth,
  setWidth: (newWidth) => set({ width: newWidth }),

  depth: defaultWidth,
  setDepth: (newDepth) => set({ depth: newDepth }),

  anchorX: defaultAnchor,
  setAnchorX: (newAnchorPoint) => set({ anchorX: newAnchorPoint }),

  anchorZ: defaultAnchor,
  setAnchorZ: (newAnchorPoint) => set({ anchorZ: newAnchorPoint }),

  rotate: false,
  setRotate: (bool) => set({ rotate: bool }),

  color: "#ff0000",
  setColor: (newColor) => set({ color: newColor }),

  selectedBricks: [],
  setSelectedBricks: ({ object, shift }) =>
    set((state) => {
      if (object === undefined) return { selectedBricks: [] };
      else if (Array.isArray(object)) return { selectedBricks: object };
      else if (!shift)
        return state.selectedBricks[0] === object
          ? { selectedBricks: [] }
          : { selectedBricks: [object] };
      else if (state.selectedBricks.includes(object))
        return {
          selectedBricks: state.selectedBricks.filter((o) => o !== object),
        };
      else return { selectedBricks: [object, ...state.selectedBricks] };
    }),

  bricks: [],
  setBricks: (getBricks) =>
    set((state) => ({ bricks: getBricks(state.bricks) })),
}));
