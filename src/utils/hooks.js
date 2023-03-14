import useKeyboardShortcut from "use-keyboard-shortcut";

export const useAnchorShorcuts = (anchorX, anchorZ, set) => {
  const anchorXPlus = () => {
    set({ anchorX: anchorX + 1 });
  };

  const anchorXMinus = () => {
    set({ anchorX: anchorX - 1 });
  };

  const anchorZPlus = () => {
    set({ anchorZ: anchorZ - 1 });
  };

  const anchorZMinus = () => {
    set({ anchorZ: anchorZ + 1 });
  };

  useKeyboardShortcut(["D"], anchorXPlus, {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  useKeyboardShortcut(["A"], anchorXMinus, {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  useKeyboardShortcut(["W"], anchorZPlus, {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  useKeyboardShortcut(["S"], anchorZMinus, {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  return null;
};
