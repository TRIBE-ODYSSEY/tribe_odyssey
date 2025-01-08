/* eslint-disable */
import { FC, useState, useEffect, useRef, useMemo, useCallback } from "react";
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import Button from "@src/components/common/Button";
import styled from "styled-components";
import Modal from "react-modal";
import useOwnTribes from "@src/lib/hooks/useOwnTribes";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import { useAccount, useSignMessage, useContractRead } from "wagmi";
import { useModal } from 'connectkit';
import debounce from 'lodash/debounce';
import { ABI } from '@src/lib/config/abi/index';
import { STAKING_CONTRACT_ADDRESS } from '@src/lib/config/contracts';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
  },
};

const useWindowSize = (delay = 250) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = useCallback(
    debounce(() => {
      setWidth(window.innerWidth);
    }, delay),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return width;
};

const StakingPage: FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { address, isConnected } = useAccount();
  const { setOpen: openConnectModal } = useModal();
  const { signMessageAsync } = useSignMessage();
  const { tribes: ownTribes, stakedTribes } = useOwnTribes(refreshTrigger);
  const { data: isStakingEnabled } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: ABI.staking,
    functionName: 'isStakingEnabled',
  });

  const [selectedapes, setSelectedapes] = useState<number[]>([]);
  const [activetab, setActivetab] = useState(0);
  const [allselected, setAllselected] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [unstakemodal, setUnstakemodal] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const tribes = useMemo(() => {
    if (activetab === 0) {
      return ownTribes;
    } else {
      return stakedTribes;
    }
  }, [ownTribes, stakedTribes, activetab]);

  const selectAll = () => {
    if (!allselected) {
      setAllselected(true);
      setSelectedapes(tribes.map((t: any) => t.id));
    } else {
      setAllselected(false);
      setSelectedapes([]);
    }
  };

  const toggleApeSelector = (id: number) => {
    if (selectedapes.includes(id)) {
      setSelectedapes(selectedapes.filter((n) => n !== id));
    } else {
      setSelectedapes([...selectedapes, id]);
    }
  };

  const onStake = async () => {
    if (selectedapes.length === 0) {
      toast.error("Please select Apes to stake!");
      return;
    }

    if (!isConnected || !address) {
      toast.error("Please connect wallet to stake!");
      return;
    }

    const msg = JSON.stringify({
      ids: selectedapes,
      address: address.toLowerCase(),
    });

    setWaiting(true);
    try {
      const signature = await signMessageAsync({
        message: msg,
      });
      
      const response = await axios.post("/staking/stake", {
        address,
        signature,
        ids: selectedapes,
      });
      
      toast.success(
        `${response.data.staked.length} nft(s) have been staked successfully!`
      );
      
      setConfirmmodal(false);
      setSelectedapes([]);
      setRefreshTrigger(prev => prev + 1);
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to stake NFTs");
    } finally {
      setWaiting(false);
    }
  };

  const onUnStake = async () => {
    if (selectedapes.length === 0) {
      toast.error("Please select Apes to unstake!");
      return;
    }
    if (!isConnected || !address) {
      toast.error("Please connect wallet to unstake!");
      return;
    }

    const msg = JSON.stringify({
      ids: selectedapes,
      address: address.toLowerCase(),
    });

    setWaiting(true);
    try {
      const signature = await signMessageAsync({
        message: msg,
      });
      
      const response = await axios.post("/staking/unstake", {
        address,
        signature,
        ids: selectedapes,
      });
      
      toast.success(
        `${response.data.unstaked.length} nft(s) have been unstaked successfully!`
      );
      
      setUnstakemodal(false);
      setSelectedapes([]);
      setRefreshTrigger(prev => prev + 1);
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to unstake NFTs");
    } finally {
      setWaiting(false);
    }
  };

  const stakeref = useRef<HTMLDivElement>(null);
  const onlyWidth = useWindowSize();
  const [apebxwidth, setApebxwidth] = useState(0);

  useEffect(() => {
    if (stakeref.current) {
      const stakwwidth =
        stakeref.current.clientWidth -
        parseFloat(getComputedStyle(stakeref.current).paddingLeft) -
        parseFloat(getComputedStyle(stakeref.current).paddingRight);
      
      let tempwidth;
      if (onlyWidth >= 1200) {
        tempwidth = stakwwidth / 8 - 2;
      } else if (onlyWidth >= 800) {
        tempwidth = stakwwidth / 6 - 2;
      } else if (onlyWidth >= 400) {
        tempwidth = stakwwidth / 4 - 2;
      } else {
        tempwidth = stakwwidth / 2 - 2;
      }
      setApebxwidth(tempwidth);
    }
  }, [stakeref.current, onlyWidth]);

  return (
    <PageLayout>
      <PageTitle>Stake Apes</PageTitle>
      <StakeWrapper>
        <div className="flex justify-center">
          <div className="flex gap-[80px] min-h-[580px] flex-row mb-12 max-w-[1200px] w-full">
            <div className="flex-[6] border border-theme-grey rounded-lg p-[20px] claim-box">
              {!isStakingEnabled ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="mb-[40px]">Staking Live Soon</p>
                </div>
              ) : isConnected ? (
                <div className="h-full">
                  <div className="p-[20px]">
                    <h4 className="font-medium text-[20px] mb-6">
                      Your Apes - ({tribes.length} Total)
                    </h4>
                    <div className="flex justify-between">
                      <span className="text-theme-grey hidden sm:block">
                        {activetab === 0
                          ? "Select the Apes to wish to stake"
                          : "Select the Apes to wish to unstake"}
                      </span>
                      <span onClick={selectAll} className="gradtext">
                        {!allselected ? "Select" : "UnSelect"} all
                      </span>
                    </div>
                  </div>
                  <div className="pr-[10px] relative claim-box-container">
                    <>
                      <div className="tabOuter mx-[20px]">
                        <div
                          className={`tabs ${activetab === 0 ? "active" : ""}`}
                          onClick={() => {
                            setSelectedapes([]);
                            setActivetab(0);
                          }}
                        >
                          All
                        </div>
                        <div
                          className={`tabs ${activetab === 1 ? "active" : ""}`}
                          onClick={() => {
                            setSelectedapes([]);
                            setActivetab(1);
                          }}
                        >
                          Staked
                        </div>
                      </div>
                      <div
                        className="stakeboxwrapper inpool px-[20px]"
                        ref={stakeref}
                      >
                        {tribes.map(({ tokenId, contract, id, is_staked }) => (
                          <ApeboxWrapperPool
                            className={`${
                              selectedapes.includes(id) ? "selected" : ""
                            }`}
                            style={{width: apebxwidth}}
                            onClick={() => toggleApeSelector(id)}
                            key={id}
                          >
                            <img
                              src={
                                contract ===
                                "0x77f649385ca963859693c3d3299d36dfc7324eb9"
                                  ? `https://cdn.0xworld.io/tribe-images/${tokenId}.png`
                                  : `https://cdn.0xworld.io/0xworld-ape-images/${tokenId}.png`
                              }
                              alt=""
                            />
                            {is_staked && (
                              <div
                                className="lockOuter red"
                                data-te-toggle="tooltip"
                                title="Staked!"
                              >
                                <LockIcon color="red" />
                              </div>
                            )}
                            <div className={selectedapes.includes(id) ? "gradbg" : ""}>
                              {selectedapes.includes(id) && <GradIcon />}
                            </div>
                          </ApeboxWrapperPool>
                        ))}
                      </div>
                    </>
                    <div className="claim-box-gradient h-full w-full absolute bottom-0 left-0 z-10 pointer-events-none" />
                    <div className="w-full absolute bottom-0 left-0 z-10">
                      <div className="flex justify-between flex-col gap-4 pb-4 md:flex-row items-center px-5">
                        <p className="text-center md:text-right">
                          You selected {selectedapes?.length} of {tribes.length} Apes
                        </p>
                        <div className="flex sm:gap-6 gap-3 flex-col sm:flex-row items-center">
                          {activetab === 0 ? (
                            <Button
                              onClick={() => setConfirmmodal(true)}
                              disabled={selectedapes?.length === 0}
                            >
                              Stake
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setUnstakemodal(true)}
                              disabled={selectedapes?.length === 0}
                            >
                              Unstake
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="mb-[40px]">
                    To stake you need to connect your wallet.
                  </p>
                  <Button onClick={() => openConnectModal?.()}>
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </StakeWrapper>

      <Modal
        isOpen={confirmmodal}
        onRequestClose={() => setConfirmmodal(false)}
        style={customStyles}
        contentLabel="Stake Confirmation"
      >
        <h1>Please confirm this information</h1>
        <button onClick={() => setConfirmmodal(false)} className="closebtn">
          <CloseIcon />
        </button>
        <div className="confirmmodalcontent modalcontent">
          <p>I understand my Apes NFTS will be Staked.</p>
          <div className="buttonsflex">
            <Button
              className="outlinebtn"
              onClick={() => setConfirmmodal(false)}
            >
              Cancel
            </Button>
            {waiting ? (
              <Button>
                <ClockLoader color="#ffffff" loading={true} size={20} />
              </Button>
            ) : (
              <Button onClick={onStake}>Agree & Stake</Button>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={unstakemodal}
        onRequestClose={() => setUnstakemodal(false)}
        style={customStyles}
        contentLabel="Unstake Confirmation"
      >
        <h1>Unstake Pool</h1>
        <button onClick={() => setUnstakemodal(false)} className="closebtn">
          <CloseIcon />
        </button>
        <div className="unstakemodalcontent modalcontent">
          <p>Are you sure that you want to unstake?</p>
          <div className="buttonsflex">
            <Button
              className="outlinebtn"
              onClick={() => setUnstakemodal(false)}
            >
              No
            </Button>
            {waiting ? (
              <Button>
                <ClockLoader color="#ffffff" loading={true} size={20} />
              </Button>
            ) : (
              <Button onClick={onUnStake}>Yes</Button>
            )}
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
};

const ApeboxWrapper = styled.div`
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  padding: 3px;
  margin: 2px;
  box-sizing: border-box;
  position: relative;
  width: calc(100px - 6px);
  border: 0px solid transparent;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    box-sizing: border-box;
  }
  
  .gradbg {
    position: absolute;
    border-radius: 14px;
    top: 3px;
    left: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: Center;
    
    svg {
      z-index: 99;
    }
    
    &.blackbg {
      background: rgba(0, 0, 0, 0.7);
    }
  }
  
  &.selected {
    background: linear-gradient(to right, #9a34ef, #d826ff);
  }
`

const ApeboxWrapperPool = styled(ApeboxWrapper)`
  position: Relative;
  
  .lockOuter {
    position: absolute;
    top: 10px;
    right: 10px;
    background: linear-gradient(180deg, #14121b 0%, #000000 100%);
    border-radius: 8px;
    padding: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: Center;
    justify-content: center;
    z-index: 9999;
    
    &.green {
      border: 1px solid green;
    }
    
    &.red {
      border: 1px solid red;
    }
  }
`

const StakeWrapper = styled.div`
  font-family: "Roboto Mono", monospace !important;
  
  .stakeboxwrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-height: 400px;
    overflow-y: auto;
    position: relative;
    padding-bottom: 80px;
    
    &.inpool {
      padding-bottom: 120px;
    }
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 4px;
    }
  }
  
  .claim-box {
    position: relative;
    overflow: hidden;
  }
  
  .claim-box-container {
    height: calc(100% - 100px);
    overflow-y: auto;
  }
  
  .claim-box-gradient {
    background: linear-gradient(
      180deg,
      rgba(20, 18, 27, 0) 0%,
      rgba(20, 18, 27, 0.8) 50%,
      #14121b 100%
    );
  }
  
  .tabOuter {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    
    .tabs {
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 8px;
      background: transparent;
      color: ${({ theme }) => theme.colors.text};
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      &.active {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
      }
    }
  }
  
  .modalcontent {
    margin-top: 20px;
    
    p {
      margin-bottom: 20px;
    }
    
    .buttonsflex {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
  }
`

const GradIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9.003 14L16.073 6.929L14.659 5.515L9.003 11.172L6.174 8.343L4.76 9.757L9.003 14Z"
        fill="url(#paint0_linear_1317_387)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1317_387"
          x1="20"
          y1="9.81132"
          x2="-0.384615"
          y2="9.81132"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9A34EF" />
          <stop offset="1" stopColor="#D826FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00072 5.72761L11.9507 0.757324L13.3647 2.17712L8.41472 7.14741L13.3647 12.1177L11.9507 13.5375L7.00072 8.5672L2.05072 13.5375L0.636719 12.1177L5.58672 7.14741L0.636719 2.17712L2.05072 0.757324L7.00072 5.72761Z"
        fill="#80839A"
      />
    </svg>
  );
};
const LockIcon = (props: { color: string }) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 4H9C9.13261 4 9.25979 4.05268 9.35355 4.14645C9.44732 4.24021 9.5 4.36739 9.5 4.5V9.5C9.5 9.63261 9.44732 9.75979 9.35355 9.85355C9.25979 9.94732 9.13261 10 9 10H1C0.867392 10 0.740215 9.94732 0.646447 9.85355C0.552678 9.75979 0.5 9.63261 0.5 9.5V4.5C0.5 4.36739 0.552678 4.24021 0.646447 4.14645C0.740215 4.05268 0.867392 4 1 4H1.5V3.5C1.5 3.04037 1.59053 2.58525 1.76642 2.16061C1.94231 1.73597 2.20012 1.35013 2.52513 1.02513C2.85013 0.700121 3.23597 0.442313 3.66061 0.266422C4.08525 0.0905301 4.54037 0 5 0C5.45963 0 5.91475 0.0905301 6.33939 0.266422C6.76403 0.442313 7.14987 0.700121 7.47487 1.02513C7.79988 1.35013 8.05769 1.73597 8.23358 2.16061C8.40947 2.58525 8.5 3.04037 8.5 3.5V4ZM1.5 5V9H8.5V5H1.5ZM4.5 6H5.5V8H4.5V6ZM7.5 4V3.5C7.5 2.83696 7.23661 2.20107 6.76777 1.73223C6.29893 1.26339 5.66304 1 5 1C4.33696 1 3.70107 1.26339 3.23223 1.73223C2.76339 2.20107 2.5 2.83696 2.5 3.5V4H7.5Z"
        fill={props.color}
      />
    </svg>
  );
};

export default StakingPage;

