import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TimelineEvent } from '../pages/Council/components/Timeline/Timeline.types'
import { Activity } from '../pages/Raffles/types/Raffle.types'

interface AppState {
  // Web3 State
  web3State: {
    isConnected: boolean
    chainId: number | null
    address: string | null
  }
  
  // ENS State
  ensState: {
    domainName: string
    isRegistering: boolean
    registrationStatus: 'idle' | 'pending' | 'success' | 'error'
  }
  
  // Health Check State
  healthState: {
    isHealthy: boolean
    lastChecked: Date | null
  }

  // Staking State
  stakingState: {
    stakedNFTs: string[]
    stakingAPR: number
    totalStaked: number
    userRewards: string
    isStaking: boolean
    stakingStatus: 'idle' | 'staking' | 'unstaking' | 'claiming'
  }

  // Council State
  councilState: {
    timelineEvents: TimelineEvent[]
    currentProposals: number
    votingPower: number
    hasVoted: boolean
  }

  // Raffle State
  raffleState: {
    activeRaffles: number
    userTickets: number
    recentActivities: Activity[]
    selectedParticipant: string | null
  }

  // Element19 State
  element19State: {
    collectionUnlocked: boolean
    dropsAvailable: boolean
    userBalance: string
  }

  // UI State
  uiState: {
    currentPage: string
    isLoading: boolean
    errorMessage: string | null
    activeSection: string | null
  }

  // Actions
  setWeb3State: (state: Partial<AppState['web3State']>) => void
  setENSState: (state: Partial<AppState['ensState']>) => void
  setHealthState: (state: Partial<AppState['healthState']>) => void
  setStakingState: (state: Partial<AppState['stakingState']>) => void
  setCouncilState: (state: Partial<AppState['councilState']>) => void
  setRaffleState: (state: Partial<AppState['raffleState']>) => void
  setElement19State: (state: Partial<AppState['element19State']>) => void
  setUIState: (state: Partial<AppState['uiState']>) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial states
        web3State: {
          isConnected: false,
          chainId: null,
          address: null
        },
        
        ensState: {
          domainName: '',
          isRegistering: false,
          registrationStatus: 'idle'
        },
        
        healthState: {
          isHealthy: false,
          lastChecked: null
        },

        stakingState: {
          stakedNFTs: [],
          stakingAPR: 0,
          totalStaked: 0,
          userRewards: '0',
          isStaking: false,
          stakingStatus: 'idle'
        },

        councilState: {
          timelineEvents: [],
          currentProposals: 0,
          votingPower: 0,
          hasVoted: false
        },

        raffleState: {
          activeRaffles: 0,
          userTickets: 0,
          recentActivities: [],
          selectedParticipant: null
        },

        element19State: {
          collectionUnlocked: false,
          dropsAvailable: false,
          userBalance: '0'
        },

        uiState: {
          currentPage: '/',
          isLoading: false,
          errorMessage: null,
          activeSection: null
        },

        // Actions
        setWeb3State: (newState) => 
          set((state) => ({ 
            web3State: { ...state.web3State, ...newState } 
          })),
          
        setENSState: (newState) =>
          set((state) => ({ 
            ensState: { ...state.ensState, ...newState } 
          })),
          
        setHealthState: (newState) =>
          set((state) => ({ 
            healthState: { ...state.healthState, ...newState } 
          })),

        setStakingState: (newState) =>
          set((state) => ({
            stakingState: { ...state.stakingState, ...newState }
          })),

        setCouncilState: (newState) =>
          set((state) => ({
            councilState: { ...state.councilState, ...newState }
          })),

        setRaffleState: (newState) =>
          set((state) => ({
            raffleState: { ...state.raffleState, ...newState }
          })),

        setElement19State: (newState) =>
          set((state) => ({
            element19State: { ...state.element19State, ...newState }
          })),

        setUIState: (newState) =>
          set((state) => ({
            uiState: { ...state.uiState, ...newState }
          }))
      }),
      {
        name: 'tribe-odyssey-storage',
        partialize: (state) => ({
          // Only persist these states
          web3State: state.web3State,
          ensState: state.ensState,
          stakingState: {
            stakedNFTs: state.stakingState.stakedNFTs,
            userRewards: state.stakingState.userRewards
          },
          councilState: {
            hasVoted: state.councilState.hasVoted,
            votingPower: state.councilState.votingPower
          }
        })
      }
    )
  )
)
