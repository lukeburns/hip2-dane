# DANE-based [HIP-0002 Well-Known Wallets](https://hsd-dev.org/HIPs/proposals/0002/)

## Usage

`npm i well-known-wallets-dane`

```js
const { fetchAddress, setServers } = require('well-known-wallets-dane')

setServers([
  '103.196.38.38',
  '103.196.38.39',
  '103.196.38.40'
])

fetchAddress('iamfernando', 'hns').then(console.log)
```
