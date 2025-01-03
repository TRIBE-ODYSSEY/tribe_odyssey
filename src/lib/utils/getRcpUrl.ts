import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodes = [process.env.VITE_RPC_URL]

const getNodeUrl = () => {
  return sample(nodes)
}

export default getNodeUrl
