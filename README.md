# BEP20Token

## Requrements
- truffle v5.1.43 (Solidity v0.5.16 (solc-js), Node v14.8.0, Web3.js v1.2.1)
- ganache test rpc.

## Getting started
```
$ npm install 
```

## Deploy BEP-20 token
```
$ SEED=<your seed phrase> truffle migrate --network {development/bsc_testnet}
```
## Binding BEP20 token to BEP-2 token (for bsc_testnet)
Please have a look this [instuction](https://github.com/binance-chain/token-bind-tool#bind-bep2-token-with-bep20-token) and make sure all of requrements for binding.

### Step 1. Import your key to bnbcli
```
$ tbnbcli keys add owner --recover
```
### Step 2. BEP-2 token issue
```
$ tbnbcli token issue --symbol TEST-999 --token-name "TEST token" --total-supply 10000000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```
### Step 3. BEP-20 token issue 
See the above command.
You have to check the following things before deploy BEP-20 token.
- token symbol should have to same (without prefix)
- total supply should be same as BEP-2 token supply
- It may be better for tokens to disable the `mint` fucntion.

### Step 4. Make a binding tx for BC 
In thie case, the total supply is `10000000000000000`and `6000000000000000` BEP-2 tokens will be locked into the pure-code-controlled address on BC. then, `4000000000000000` BEP-20 tokens will be locked into the tokenManager contract on BSC.
```
$ tbnbcli bridge bind --symbol TEST-999 --amount 6000000000000000 --expire-time <expiry time> --contract-decimals 18 --from owner --chain-id Binance-Chain-Ganges --contract-address <your token contract address> --node http://data-seed-pre-0-s3.binance.org:80
```
### Step 5. Allowance tokens to token manager contract
```
$ SEED=<your seed phrase> AMOUNT=4000000000000000 truffle exec scripts/approveTokens.js --network bsc_testnet
```
### Step 6. Make a binding tx for BSC
```
$ SEED=<your seed phrase> truffle exec scripts/bindTokenContract.js --network bsc_testnet
```

## Test
```
$ truffle test
```
