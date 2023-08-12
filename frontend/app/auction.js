import { useEffect, useState } from 'react';
import Web3 from 'web3';

const contractABI = [
  [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "AuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minBid",
				"type": "uint256"
			}
		],
		"name": "ItemAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_auctionId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_minBid",
				"type": "uint256"
			}
		],
		"name": "addItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "itemCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"name": "createAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_auctionId",
				"type": "uint256"
			}
		],
		"name": "getAuction",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "itemCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Auction.AuctionDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAuctionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_auctionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_itemId",
				"type": "uint256"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "minBid",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "highestBidder",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					}
				],
				"internalType": "struct Auction.Item",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "minBid",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_auctionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_itemId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]
];

const contractAddress = '0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99';

export default function Auction() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [auctionCount, setAuctionCount] = useState(0);
  const [auctionItems, setAuctionItems] = useState({});

  useEffect(() => {
    async function initializeWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    }

    initializeWeb3();
  }, []);

  async function createAuction() {
    if (!contract) return;

    try {
      const receipt = await contract.methods.createAuction(3600).send({ from: accounts[0] });
      console.log('Auction created:', receipt);
    } catch (error) {
      console.error('Error creating auction', error);
    }
  }

  async function displayAuctionItems(auctionId) {
    if (!contract) return;

    try {
      const auctionDetails = await contract.methods.getAuction(auctionId).call();
      const items = {};

      for (let itemId = 1; itemId <= auctionDetails.itemCount; itemId++) {
        const item = await contract.methods.getItem(auctionId, itemId).call();
        items[itemId] = item;
      }

      setAuctionItems({ ...auctionItems, [auctionId]: items });
    } catch (error) {
      console.error('Error fetching auction items', error);
    }
  }

  async function placeBid(auctionId, itemId) {
    if (!contract) return;

    const bidAmountInput = window.prompt('Enter bid amount (ETH):');
    if (!bidAmountInput) return;

    try {
      const bidAmountWei = web3.utils.toWei(bidAmountInput, 'ether');
      const receipt = await contract.methods.placeBid(auctionId, itemId).send({ from: accounts[0], value: bidAmountWei });
      console.log('Bid placed:', receipt);
    } catch (error) {
      console.error('Error placing bid', error);
    }
  }

  return (
    <div>
      <h1>Auction App</h1>
      {web3 ? (
        <div>
          <p>Connected to Ethereum</p>
          <button onClick={createAuction}>Create Auction</button>
        </div>
      ) : (
        <p>Connecting to Ethereum...</p>
      )}
      <div>
        <hr />
        <h2>Auctions</h2>
        {contract && (
          <ul>
            {Array.from({ length: auctionCount }, (_, auctionId) => (
              <li key={auctionId}>
                <h3>Auction {auctionId}</h3>
                <button onClick={() => displayAuctionItems(auctionId)}>View Items</button>
                {auctionItems[auctionId] && (
                  <ul>
                    {Object.entries(auctionItems[auctionId]).map(([itemId, item]) => (
                      <li key={itemId}>
                        <p>Item: {item.name}</p>
                        <p>Min Bid: {item.minBid} ETH</p>
                        <button onClick={() => placeBid(auctionId, itemId)}>Place Bid</button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
