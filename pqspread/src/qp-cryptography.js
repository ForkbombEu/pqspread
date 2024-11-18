import decrypt from "../contracts/decrypt.zen?raw";
import encrypt from "../contracts/encrypt.zen?raw";
import keygen from "../contracts/keygen.zen?raw";

import { zencode_exec } from "zenroom";

export const key_generation = async () => {
  const result = await zencode_exec(keygen, {});
  const keypair = result.result;
  window.localStorage.setItem("pqs_keypair", keypair);
  window.dispatchEvent(new Event("keypair-updated"));
  return keypair;
};
