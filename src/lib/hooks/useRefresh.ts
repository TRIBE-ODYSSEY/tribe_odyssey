import { useContext } from 'react'
import { RefreshContext } from '@src/lib/contexts/RefreshContext'

const useRefresh = () => {
  const { fast, slow } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow }
}

export default useRefresh
