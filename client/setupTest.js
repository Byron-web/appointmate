import "jest-extended";
import { TextEncoder, TextDecoder } from "util";

if (typeof TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("text-encoding");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

global.crypto = {
  subtle: {
    async decrypt(algorithm, key, encryptedData) {
      return jose.JWE.decrypt(encryptedData, key, {
        algorithms: [algorithm],
      });
    },
  },
};
