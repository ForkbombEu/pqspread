SRC := $(shell pwd)/..

PAYLOAD := $(shell base64 -w0 Makefile)

.PHONY: all keygen encrypt decrypt

all: keygen encrypt decrypt

keygen:
	zenroom -z ${SRC}/keygen.zen > recipient_keyring.json
	jq '. | to_entries | map(select(.key == "mlkem512_public_key")) | from_entries' recipient_keyring.json > recipient_pubkey.json

cleartext.json:
	$(info Payload: ${PAYLOAD})
	echo "{ \"cleartext\": \"${PAYLOAD}\" }" > cleartext.json

encrypt: cleartext.json
	zenroom -z ${SRC}/encrypt.zen -k recipient_pubkey.json -a cleartext.json > ciphertext.json

decrypt:
	zenroom -z ${SRC}/decrypt.zen -k recipient_keyring.json -a ciphertext.json > /dev/null
