export function utf8ToBytes(utf: string): Uint8Array {
  return new TextEncoder().encode(utf);
}

export function bytesToUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

export function bytesToBits(b: Uint8Array) {
  const bits = [];
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < 8; j++) {
      if ((Number(b[i]) & (1 << j)) > 0) {
        // bits.push(Fr.e(1));
        bits.push(1);
      } else {
        // bits.push(Fr.e(0));
        bits.push(0);
      }
    }
  }
  return bits;
}

export function bitsToBytes(a: number[]): Uint8Array {
  const b = [];

  for (let i = 0; i < a.length; i++) {
    const p = Math.floor(i / 8);
    if (b[p] === undefined) {
      b[p] = 0;
    }
    if (a[i] === 1) {
      b[p] |= 1 << i % 8;
    }
  }
  return Uint8Array.from(b);
}

export function utf8ToBits(utf8: string) {
  return bytesToBits(utf8ToBytes(utf8));
}

const cachedHexes = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, '0'));
export function bytesToHex(uint8a: Uint8Array): string {
  let hex = '';
  for (let i = 0; i < uint8a.length; i++) {
    hex += cachedHexes[uint8a[i]];
  }
  return hex;
}
