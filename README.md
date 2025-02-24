<!--
SPDX-FileCopyrightText: 2024 The Forkbomb Company

SPDX-License-Identifier: AGPL-3.0-or-later
-->

# PQSpread

Serveless (and offline) encrypt and exchange files using asymetric PQC. Works by opening a single html file in the browser, download from the [releases](https://github.com/ForkbombEu/pqspread/releases) and double click on it!

PQSpread is a quantum-safe file encryption and decryption tool that leverages the ML-KEM-512 (FIPS-203) algorithm combined with AES-GCM to ensure security against quantum threats. This application is built entirely in-house using the cutting-edge Zenroom virtual machine, providing a secure, client-side solution with no remote data storage required.

## Features

- **Quantum-Safe Encryption**: Uses ML-KEM-512 (FIPS-203) + AES-GCM for robust security.
- **Client-Side Operations**: All cryptographic operations are performed on the client side, ensuring no data is stored remotely.
- **Easy to Use**: Simple interface for encrypting and decrypting files.
- **Offline Mode**: Download a single HTML file to run the application offline.

## Usage

### Online Mode

You can use PQSpread online by visiting [this link](https://forkbomb.eu/pqspread).

### Offline Mode
```sh
curl -sLO https://github.com/ForkbombEu/pqspread/releases/latest/download/pqspread.html
```
For offline and paranoid mode, download the single HTML file from [GitHub](https://github.com/forkbombeu/pqspread) and run it on your machine.

## How to Use

When loading the page, it automatically generates a **secret key** and the corresponding **public key**. Both are stored in the browser storage, if you refresh they won't change. To generate a new secret/public key, you need CTRL + F5

1. **Encrypt a File**:
   - Click the "Encrypt" button.
   - Paste the recipient's public key.
   - Share your public key with others to receive encrypted files.

2. **Decrypt a File**:
   - Click the "Decrypt" button.
   - Use the provided interface to decrypt files sent to you.

## Public Key

Your public key can be shared with others to receive encrypted files. Copy it from the application interface.

## Customize

Wanna play with the cryptography used in PQSprad? Check out apiroom.net :-)

## Made with ❤️🔥 by FORKBOMB hackers
