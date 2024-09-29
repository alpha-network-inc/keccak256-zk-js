# @alpha-network/keccak256-zk

## Description
The JavaScript SDK designed for verifying data existence using zero-knowledge proofs (ZKP) based on the Keccak256 hashing algorithm.

This SDK enables developers to confirm the validity of data in blockchain or distributed storage systems without revealing its actual content. It’s easy to integrate, making it ideal for blockchain applications, data privacy solutions, and decentralized projects.

## Installation
```shell
npm install @alpha-network/keccak256-zk
```

## Usage
### Generate ZK Proof
To generate a zero-knowledge proof, use the `generateZkProof` function:
```typescript
import { generateZkProof } from '@alpha-network/keccak256-zk';

const dataBytes = new Uint8Array([/* your data bytes here */]);
const nonce = '12345678'; // Example nonce (must be 8 characters long)

try {
  const { proof, publicSignals } = await generateZkProof({ dataBytes, nonce });
  console.log('ZK Proof generated:', proof);
  console.log('Public Signals:', publicSignals);
  return { proof, publicSignals };
} catch (error) {
  console.error('Error generating ZK Proof:', error.message);
}
```

### Verify ZK Proof
To verify a generated proof, use the `verifyZkProof` function:
```typescript
import { verifyZkProof } from '@alpha-network/keccak256-zk';

try {
  const isValid = await verifyZkProof({
    hash: expectedHash, // Keccak256 Hash
    nonce: expectedNonce,
    proof,
    publicSignals,
  });
  console.log('ZK Proof verification result:', isValid);
} catch (error) {
  console.error('Error verifying ZK Proof:', error.message);
}
```

## License
MIT