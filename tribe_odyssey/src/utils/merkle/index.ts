import AccountTree from "./account-tree";

export const getMerkleProof = (whitelist, account) => {
  const accountTree = new AccountTree(whitelist);
  let merkleProof;
  try {
    merkleProof = accountTree.getProof(account);
  } catch (e) {
    merkleProof = [];
  }

  return merkleProof;
};
