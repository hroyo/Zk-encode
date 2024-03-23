import omitDeep from "omit-deep";
import { utils } from "ethers";
import { useContract } from "./config/lensContract";

export const omit = (object, name) => {
  return omitDeep(object, name);
};

export const signedTypeData = (signer,domain, types, value) => {

  return signer?._signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};

export const splitSignature = (signature) => {
  return utils.splitSignature(signature);
};
