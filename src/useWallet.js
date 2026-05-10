import { useState, useEffect, useCallback } from 'react'

// BNB Smart Chain Mainnet
const BSC_PARAMS = {
  chainId: '0x38', // 56 in hex
  chainName: 'BNB Smart Chain',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
}

// Shorten an address for display
export const shortAddr = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : '')

export function useWallet() {
  const [account, setAccount] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState(null)

  const isMetaMaskInstalled = () =>
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'

  const isOnBSC = chainId === BSC_PARAMS.chainId

  // Try to switch to BNB chain; if not added, add it
  const switchToBSC = useCallback(async () => {
    if (!isMetaMaskInstalled()) return false
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_PARAMS.chainId }],
      })
      return true
    } catch (err) {
      // 4902 = chain not added to wallet
      if (err.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BSC_PARAMS],
          })
          return true
        } catch (addErr) {
          setError('Could not add BNB Chain to wallet. / 无法添加 BNB Chain。')
          return false
        }
      }
      setError('Could not switch to BNB Chain. / 无法切换到 BNB Chain。')
      return false
    }
  }, [])

  const connect = useCallback(async () => {
    setError(null)

    if (!isMetaMaskInstalled()) {
      // No wallet — open MetaMask install page
      window.open('https://metamask.io/download/', '_blank')
      setError('MetaMask not detected. / 未检测到 MetaMask。')
      return
    }

    setConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0])
        const cid = await window.ethereum.request({ method: 'eth_chainId' })
        setChainId(cid)
        if (cid !== BSC_PARAMS.chainId) {
          await switchToBSC()
        }
      }
    } catch (err) {
      // 4001 = user rejected
      if (err.code === 4001) {
        setError('Connection rejected. / 连接被拒绝。')
      } else {
        setError('Failed to connect wallet. / 钱包连接失败。')
      }
    } finally {
      setConnecting(false)
    }
  }, [switchToBSC])

  const disconnect = useCallback(() => {
    setAccount(null)
    setChainId(null)
    setError(null)
  }, [])

  // Listen for account / network changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) disconnect()
      else setAccount(accounts[0])
    }

    const handleChainChanged = (cid) => {
      setChainId(cid)
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    // Check if already connected on load
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          window.ethereum
            .request({ method: 'eth_chainId' })
            .then(setChainId)
        }
      })
      .catch(() => {})

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [disconnect])

  return {
    account,
    chainId,
    connecting,
    error,
    isOnBSC,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    connect,
    disconnect,
    switchToBSC,
  }
}
