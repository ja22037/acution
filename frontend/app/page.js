'use client'
import { useState } from 'react';
import { ethers } from 'ethers';
import styles from './page.module.css'
import EnglishAuctionABI from '../EnglishAuction.json'; // Import the contract ABI

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  async function connectToEthereum() {
	
	if (typeof window.ethereum !== 'undefined') {
	  try {
		await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request user's permission to connect
		
		const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(web3Provider);
  
		const auctionContract = new ethers.Contract(
		  '0x28319C91FF6fA07bb1A624965bD6FddCFfc6781a', // Replace with the actual contract address
		  EnglishAuctionABI,
		  web3Provider.getSigner()
		);
		setContract(auctionContract);
  
		const highestBid = await auctionContract.highestBid();
		setCurrentBid(highestBid);
	  } catch (error) {
		console.log("Error connecting to MetaMask:", error);
	  }
	} else {
	  console.log("Web3 provider not available");
	}
  }
  
  async function placeBid() {
	try {
	  const parsedBidAmount = ethers.utils.parseEther(bidAmount);
	  const tx = await contract.bid({ value: parsedBidAmount });
	  await tx.wait();
	  const newHighestBid = await contract.highestBid();
	  setCurrentBid(newHighestBid);
	} catch (error) {
	  console.error('Error placing bid:', error);
	}
  }	

  async function withdraw() {
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      const bidderBalance = await contract.bids(provider.getSigner().getAddress());
      console.log('Withdrew', bidderBalance.toString(), 'Wei');
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  }

  async function endAuction() {
    try {
      const tx = await contract.end();
      await tx.wait();
      // You might want to refresh the page or update UI after the auction ends
    } catch (error) {
      console.error('Error ending auction:', error);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>Auction</div>
        {provider ? (
          <div className={styles.connected}>
            <p>Connected to Ethereum</p>
          </div>
        ) : (
          <button className={styles.submit} onClick={connectToEthereum}>
            Connect to Ethereum
          </button>
        )}
        

        {/* Bid Section */}

        {provider && (
          <div className={styles.bidSection}>
            <div className={styles.subtitle}>Current Bid: {ethers.utils.formatEther(currentBid)}</div>

            <div>
              <input
                className={styles.input}
                type="number"
                step="0.01"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount in Ether"
              />
            </div>


            <div className={styles.buttonGroup}>
              <button className={styles.submit} onClick={placeBid}>
                Place Bid
              </button>
              <button className={styles.submit} onClick={withdraw}>
                Withdraw
              </button>
              <button className={styles.submit} onClick={endAuction}>
                End Auction
              </button>
            </div>


          </div>
        )}
      </div>
    </div>
  );
}