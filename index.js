const Web3 = require('web3')
const erc20abi = require('human-standard-token-abi')

const web3 = new Web3('https://rinkeby.infura.io')

const WETH_CONTRACT_ADDRESS = '0xc778417E063141139Fce010982780140Aa0cD5Ab'

const wethContract = new web3.eth.Contract(erc20abi, WETH_CONTRACT_ADDRESS)

const testAccount = {
  address: '0x115c107159781bb6a73601dfd9e0f71318ada25d',
  privateKey: '0x57d1a5b853f639e649d8b2ae9cea01570db7584026050ebc22ec612f7ff419ef'
}

const approveAddress = '0x4b6f1dd4435209967d33a5ba11f9eacea4b20df3'

async function approveWeth () {
  const txDetails = {
    from: testAccount.address,
    to: WETH_CONTRACT_ADDRESS,
    data: wethContract.methods.approve(approveAddress, 1000).encodeABI(),
    gas: 2000000
  }

  try {
    const signedTx = await web3.eth.accounts.signTransaction(txDetails, testAccount.privateKey)
    console.log(`Calling web3.eth.sendSignedTransaction()....`)
    const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    console.log(`result = ${JSON.stringify(result)}`)
  } catch (err) {
    console.error(err)
  }
}

approveWeth()
