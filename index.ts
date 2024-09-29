import { groth16 } from 'snarkjs';

import vKey from './zk/verification_key.json';
import { bitsToBytes, bytesToBits, bytesToHex, bytesToUtf8, utf8ToBits } from './utils';

const MAX_DATA_BYTES_LEN = 768;

export async function generateZkProof({ dataBytes, nonce }: { dataBytes: Uint8Array; nonce: string }) {
  if (dataBytes.length > MAX_DATA_BYTES_LEN) {
    return Promise.reject(Error('dataBytes supports a maximum length of 768'));
  }

  if (nonce.length !== 8) {
    return Promise.reject(Error('nonce length is supported only at 8 characters'));
  }

  const { proof, publicSignals } = await groth16.fullProve(
    {
      in: bytesToBits(dataBytes),
      nonce: utf8ToBits(nonce),
    },
    'zk/circuit.wasm',
    'zk/circuit_final.zkey',
  );

  return { proof, publicSignals };
}

export async function verifyZkProof({
  hash,
  nonce,
  proof,
  publicSignals,
}: {
  hash: string;
  nonce: string;
  proof: snarkjs.Groth16Proof;
  publicSignals: snarkjs.PublicSignals;
}) {
  const hashFromPublicSignals = bytesToHex(bitsToBytes(publicSignals.slice(0, 256).map(Number)));
  if (hash !== hashFromPublicSignals) {
    return Promise.reject(Error('hash does not match the publicSignals'));
  }

  const nonceFromPublicSignals = bytesToUtf8(
    Uint8Array.from(bitsToBytes(publicSignals.slice(256, 256 + 64).map(Number))),
  );

  if (nonce !== nonceFromPublicSignals) {
    return Promise.reject(Error('nonce does not match the publicSignals'));
  }

  return groth16.verify(vKey, publicSignals, proof);
}
