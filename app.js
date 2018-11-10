require('dotenv').config()
const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/CTNrMRz6lyyxOxddWG7y')

const acct1 = '0xff4b093efFAbAEAE2aE72E3F048A75e3456cD5C4'
const acct2 = '0x37f2A6E2b3F04c392c3cDF65B8CEEA3942f9F31d'

// To not reveal private keys export them to environment variables.
// Example: $ export PRIVATE_KEY_1 ='Private Key'
// console.log(process.env.PRIVATE_KEY_1)
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getTransactionCount(acct1, (err, txCount) => {
    //  Build a transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: acct2,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice:  web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    // console.log(txobject)

    // Sign a transaction
    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

    // Broadcast a transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('Transaction Hash: ', txHash)
    })
})

console.log(web3.eth.accounts.create())
