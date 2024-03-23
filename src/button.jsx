import React from 'react'
import { useConnect, useAccount, useEnsName } from 'wagmi'

const Button = () => {
      const {
    connect,
    connectors,
    error,
    isLoading,
    pendingConnector,
  } = useConnect()
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  return (
    <div>
        <div>{ensName ? `${ensName} (${address})` : address}</div>
      {/* <h3 className={styles.headingMd}>Connect your wallet</h3>
      <p className={styles.textNormal2x}>
        Connect with one of our available wallet providers or create a new one
      </p> */}
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
    </div>
  )
}

export default Button