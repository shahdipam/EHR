import React, { Component } from 'react';
// import logo from '../logo.png';
import './App.css';
import HealthCare from '../abis/HealthCare.json'
// import { Button } from 'semantic-ui-react'
import Web3 from 'web3';

class App extends Component {


  async componentDidMount() {
  await this.loadWeb3()
  await this.loadBlockchainData()
}

  async loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}
  
  async loadBlockchainData() {
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  this.setState({ account: accounts[0] })
  console.log(accounts)
  const networkId = await web3.eth.net.getId()
  const networkData = HealthCare.networks[networkId]

  if(networkData){
  
    const healthcare = web3.eth.Contract(HealthCare.abi, networkData.address)
    console.log(healthcare)


  this.setState({healthcare})
  this.setState({loading: false})
  

  }
   else {
    window.alert('Healthcare contract not deployed to the network.')
   }
}

  constructor(props){
    super(props)
    this.state = {
      account: '',
      loading: true,
    }
  }


  onSubmit = async (event) => {
    // document.getElementById('hello').innerHTML = 'Hello'
      await this.state.healthcare.methods.signupPatient('abcd',18)
      const a = await this.state.healthcare.getPatients()
      console.log(a)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer">
            EHR Portal
          </a>
          <p className="text-white"> {this.state.account} </p>
        </nav>

        <h1>Hello</h1>

        <h1>Hello</h1>

        <button type="submit" onClick={this.onSubmit}>Submit</button>
        <p id='hello'></p>
        </div>

    );
  }
}

export default App;
