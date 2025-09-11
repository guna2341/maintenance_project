
const BLOCK_API = "Blocks";

const endpoints = {
  LOGIN: "auth/login",
  BLOCK: {
    GETBLOCKS: `${BLOCK_API}/getBlocks`,
    ADDBLOCKS: `${BLOCK_API}/addBlocks`,
    EDITBLOCKS: `${BLOCK_API}/editBlocks`,
    DELETEBLOCKS: `${BLOCK_API}/deleteBlocks`,
  },
};

export default endpoints;