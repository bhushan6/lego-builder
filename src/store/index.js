import create from "zustand";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";

const client = createClient({
  publicApiKey:
    "pk_dev_TZ6PEVqkJbtrcNqq8bnqghwmoxDr1WuSOcxycuo-_qYBLp9jDPQ12nhRcyNU_L_o",
});

const useStore = create(
  liveblocks(
    (set, get) => ({
      bricksState: [],
      setBricks: (newBrick) => {
        const { bricksState } = get();

        set({
          bricksState: [...bricksState, newBrick],
        });
      },
      clearBricks: () => {
        set({
          bricksState: [],
        });
      },
    }),
    { client, storageMapping: { bricksState: true } }
  )
);

export default useStore;
