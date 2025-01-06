import AccountTree from "./account-tree";

export const getMerkleProof = (account: string) => {
  const accountTree = new AccountTree([account]);
  let merkleProof: string[];
  try {
    merkleProof = accountTree.getProof(account);
  } catch (e) {
    merkleProof = [];
  }

  return merkleProof;
};
