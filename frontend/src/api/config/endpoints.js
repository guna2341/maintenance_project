
const BLOCK_API = "Blocks";

const endpoints = {
  BLOCK: {
    GETBLOCKS: `blocks/get${BLOCK_API}`,
    ADDBLOCKS: `blocks/add${BLOCK_API}`,
    EDITBLOCKS: `blocks/edit${BLOCK_API}`,
    DELETEbLOCKS: `blocks/delete${BLOCK_API}`,
  },
};

export default endpoints;