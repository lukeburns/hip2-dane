# DANE-based [HIP-0002 Well-Known Wallets](https://hsd-dev.org/HIPs/proposals/0002/)

## Usage

`npm i hip2-dane`

```js
const { fetchAddress, setServers } = require('hip2-dane')

setServers([
  '127.0.0.1:5350'
])

fetchAddress('iamfernando', 'hns').then(console.log)
```
