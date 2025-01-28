import {
    FC,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import styled from "styled-components";
  import banana from "../assets/images/banana.png";
  import watch from "../assets/images/watch.png";
  import redirectIcon from "../assets/images/redirectIcon.png";
  import { Tab } from "@headlessui/react";
  import { useNavigate, useParams } from "react-router-dom";
  import * as moment from "moment";
  import useRaffle from "@src/lib/hooks/useRaffle";
  import axios from "axios";
  import { useAccount, useSignMessage } from "wagmi";
  import { toast } from "react-toastify";
  import { shortenAddress, shortenBtcAddress } from "@src/utils/address";
  import Confetti from "react-confetti";
  import GlobalContext from "@src/lib/context/GlobalContext";
  import { ClockLoader } from "react-spinners";
  import useUserInfo from "@src/lib/hooks/useUserInfo";
  import AddressAvatar from '@src/components/common/AddressAvatar';
  import { ZeroAddress } from 'ethers';
  import { ShareIcon } from '@heroicons/react/24/outline';

  interface AboutPageProps {}
  
  const Participants = ({ raffle, participants, activities }: any) => {
    return raffle && raffle.project_status === "Open" ? (
      <div className="contentwrapper">
        <Tab.Group>
          <Tab.List className="tabheader">
            <Tab className={({ selected }) => 
              `${selected ? 'text-[var(--color-button-primary)]' : 'text-[var(--color-text-primary)]'} px-4 py-2`
            }>
              Activity
            </Tab>
            <Tab className={({ selected }) => 
              `${selected ? 'text-[var(--color-button-primary)]' : 'text-[var(--color-text-primary)]'} px-4 py-2`
            }>
              {`Participants (${participants.length})`}
            </Tab>
          </Tab.List>
          
          <Tab.Panels className="tabContainer">
            <Tab.Panel>
              <div className="rowwrapper">
                {(activities || []).map((activity: any) => (
                  <div className="rwwrapper" key={activity.id}>
                    <div className="leftrw">
                      <div>
                        {activity.user?.profile_image ? (
                          <img
                            src={activity.user.profile_image}
                            className="w-[50px] rounded-full"
                            alt=""
                          />
                        ) : (
                          <AddressAvatar 
                            address={activity.address} 
                            size={50}
                            className="rounded-full"
                          />
                        )}
                      </div>
                      <div className="flex flex-col nmbx">
                        <h3>
                          {activity.user?.name ?? shortenAddress(activity.address)}
                        </h3>
                        <div className="clrd">{activity.entry} Entries</div>
                      </div>
                    </div>
                    <div className="rightrw">
                      {moment.utc(activity.entered_at).fromNow()}
                      <img src={redirectIcon} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            
            <Tab.Panel>
              <div className="rowwrapper">
                {(participants || []).map((participant: any) => (
                  <div className="rwwrapper" key={participant.id}>
                    <div className="leftrw">
                      <div>
                        {participant.user?.profile_image ? (
                          <img
                            src={participant.user.profile_image}
                            className="w-[50px] rounded-full"
                            alt=""
                          />
                        ) : (
                          <AddressAvatar 
                            address={participant.address} 
                            size={50}
                            className="rounded-full"
                          />
                        )}
                      </div>
                      <div className="flex flex-col nmbx">
                        <h3>
                          {participant?.user?.name ??
                            shortenAddress(participant.address)}
                        </h3>
                        <div className="clrd">{participant.entry} Entries</div>
                      </div>
                    </div>
                    <div className="rightrw">
                      {moment.utc(participant.entered_at).fromNow()}
                      <img src={redirectIcon} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    ) : null;
  };
  
  const RaffleOpenPage: FC<AboutPageProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [trigger, setTrigger] = useState(0);
    const context: any = useContext(GlobalContext);
    const setState = context.setState;
  
    const [showFireworks, setShowFireworks] = useState(false);
  
    const { raffle, participants, activities, winner } = useRaffle(id || '', trigger);
    const { address } = useAccount();
    const user = useUserInfo(trigger);
    const { signMessageAsync } = useSignMessage();
    const navigate = useNavigate();
  
    const finished = useMemo(() => {
      return (
        raffle &&
        (raffle.project_status !== "Open" ||
          moment.utc(raffle.raffle_at).diff(moment.utc(), "minutes") <= 0)
      );
    }, [raffle]);
    const [countDown, setCountDown] = useState<string>("");
    const timerRef = useRef<any>(null);
    const intervalRef = useRef<any>(null);
    const [duration, setDuration] = useState<moment.Duration>();
    const [loadingIndex, setLoadingIndex] = useState(-1);
    const [custom, setCustom] = useState<number>();
  
    useEffect(() => {
      if (raffle && !duration) {
        setDuration(
          moment.duration(moment.utc(raffle?.raffle_at).diff(moment.utc()))
        );
      }
    }, [raffle, duration]);
  
    useEffect(() => {
      if (duration) {
        intervalRef.current = setInterval(function () {
          // get updated duration
          let temp = duration.subtract(1, "seconds");
          if (temp.asSeconds() <= 0) {
            clearInterval(intervalRef.current);
          } else {
            // otherwise, show the updated countdown
            setCountDown(
              temp.months() * 30 +
                temp.days() +
                "d " +
                temp.hours() +
                ":" +
                temp.minutes() +
                ":" +
                temp.seconds()
            );
          }
          setDuration(temp);
        }, 1000);
      }
  
      return () => clearInterval(intervalRef.current);
    }, [duration]);
  
    const onEnterRaffle = async (points: number) => {
      if (points <= 0) {
        toast.error("Please input valid points!");
        return;
      }
  
      if (address) {
        if (!user || !user.name || !user.btc_address) {
          toast.error("Please complete to enter raffle!");
          navigate("/account");
          return;
        }
        axios
          .get("/user/nonce", { params: { address } })
          .then(async (response) => {
            setLoadingIndex(points);
  
            const nonce = response.data.nonce;
            const signature = await signMessageAsync({
              message: `I am signing my one-time nonce: ${nonce}`,
            });
  
            axios
              .post("/staking/enter-raffle", {
                id: raffle.id,
                points,
                address,
                signature,
              })
              .then(() => {
                setShowFireworks(true);
                toast.success("Successfully entered!!");
                setTrigger((prev) => prev + 1);
                setState((prevState: any) => ({
                  ...prevState,
                  trigger: (prevState.trigger || 0) + 1,
                }));
                timerRef.current = setTimeout(
                  () => setShowFireworks(false),
                  10000
                );
              })
              .catch((error) => {
                console.error(error);
                switch (error?.response?.data?.error) {
                  case "this raffle allow only once":
                    toast.error(
                      "Failed to enter!. This raffle allows only once!"
                    );
                    break;
                  default:
                    toast.error("Failed to enter!");
                }
              })
              .finally(() => {
                setLoadingIndex(-1);
              });
          })
          .catch((error) => {
            console.error(error);
            setLoadingIndex(-1);
          });
      } else {
        toast.error("Please connect wallet!");
      }
    };
  
    useEffect(() => {
      return () => {
        clearTimeout(timerRef.current!);
        clearInterval(intervalRef.current);
      };
    }, []);
  
    return (
      <Layout>
        {raffle ? (
          <div className="text-white">
            <div className="pt-16 ">
              <div className="boxflexouter">
                <Leftbox>
                  <div className="relative imgwrapper">
                    <img
                      src={raffle.prize_image}
                      className="w-full  rounded-[10px]"
                      alt=""
                    />
                    <div className="absolute bottom-3  bg-[#ffc700] text-[10px] text-black font-bold px-3 py-1 rounded-full imgtext">
                      {finished
                        ? "Finished"
                        : `${Math.max(
                            moment
                              .utc(raffle.raffle_at)
                              .diff(moment.utc(), "days"),
                            0
                          )} 
                        Days Left`}
                    </div>
                  </div>
                  <div className="particdesk">
                    <Participants
                      raffle={raffle}
                      participants={participants}
                      activities={activities}
                    />
                  </div>
                </Leftbox>
                <Rightbox>
                  <div className="pl-8 rght1">
                    <h1 className="font-bold text-2xl">{raffle.project_name}</h1>
                    <div className="mt-1 text-sm" style={{ color: "#80839A" }}>
                      #{raffle.nft_id}
                    </div>
                    {!finished && (
                      <div
                        className="mt-5 mb-4 text-sm flex items-center"
                        style={{ color: "#80839A" }}
                      >
                        <img
                          src={watch}
                          style={{
                            width: "18px",
                            marginRight: "6px",
                          }}
                          alt=""
                        />
                        <div>Ends in {countDown}</div>
                      </div>
                    )}
                    <div className="mt-2">
                      <h3
                        className=" font-semibold "
                        style={{
                          color: "#80839A",
                          marginBottom: "6px",
                        }}
                      >
                        Description
                      </h3>
                      <div className="text-[14px]">{raffle.description}</div>
                    </div>
                    {raffle.project_status === "Open" &&
                    duration &&
                    duration.asSeconds() > 0 ? (
                      <div className="mt-6 rounded-[5px] compbox">
                        <div className="py-3 px-4 bg-[#1b1921] rounded-t-md font-semibold text-[16px] bordercomp">
                          <h1>Enter Competition</h1>
                        </div>
                        <div style={{ padding: "10px" }}>
                          <div className="rowmain  grid grid-cols-3 gap-x-3">
                            {[0, 1, 2].map(
                              (index) =>
                                raffle.conditions.length > index && (
                                  <Card backgroundColor="#1b1921" key={index}>
                                    <div className="flex flex-col gap-y-4 items-center compinnerbox">
                                      <div className="font-bold text-xl">
                                        {raffle.conditions[index].entry}
                                      </div>
                                      <div className="entrtext">
                                        {raffle.conditions[index].entry > 1
                                          ? "Entries"
                                          : "Entry"}
                                      </div>
                                      {loadingIndex ===
                                      raffle.conditions[index].points ? (
                                        <Button>
                                          <ClockLoader
                                            color={"#ffffff"}
                                            loading={true}
                                            size={20}
                                            className="m-auto"
                                          />
                                        </Button>
                                      ) : (
                                        <Button
                                          onClick={() =>
                                            onEnterRaffle(
                                              raffle.conditions[index].points
                                            )
                                          }
                                          disabled={
                                            loadingIndex > -1 &&
                                            loadingIndex !==
                                              raffle.conditions[index].points
                                          }
                                        >
                                          <div
                                            className="flex items-center justify-center gap-x-1"
                                            style={{
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <div>
                                              <img
                                                src={banana}
                                                className="w-[20px]"
                                                alt="banana"
                                              />
                                            </div>
                                            <div>
                                              {raffle.conditions[index].points}{" "}
                                              Points
                                            </div>
                                          </div>
                                        </Button>
                                      )}
                                    </div>
                                  </Card>
                                )
                            )}
                          </div>
                          {raffle.conditions.length > 3 && (
                            <div className="rowmain flex flex-col justify-between md:flex-row">
                              <Card backgroundColor="#1b1921">
                                <div className="flex flex-col gap-y-4 items-center compinnerbox">
                                  <div className="font-bold text-2xl">
                                    {raffle.conditions[3].entry}
                                  </div>
                                  <div className="entrtext">Entries</div>
                                  {loadingIndex ===
                                  raffle.conditions[3].points ? (
                                    <Button>
                                      <ClockLoader
                                        color={"#ffffff"}
                                        loading={true}
                                        size={20}
                                        className="m-auto"
                                      />
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        onEnterRaffle(raffle.conditions[3].points)
                                      }
                                      disabled={
                                        loadingIndex > -1 &&
                                        loadingIndex !==
                                          raffle.conditions[3].points
                                      }
                                    >
                                      <div className="flex items-center justify-center gap-x-1">
                                        <div>
                                          <img
                                            src={banana}
                                            className="w-[20px]"
                                            alt="banana"
                                          />
                                        </div>
                                        <div>
                                          {raffle.conditions[3].points} Points
                                        </div>
                                      </div>
                                    </Button>
                                  )}
                                </div>
                              </Card>
                              <Card backgroundColor="#1b1921">
                                <div className="flex flex-col gap-y-4 items-center compinnerbox">
                                  <div className="font-bold text-2xl">
                                    <input
                                      type="number"
                                      name="entries"
                                      id="entries"
                                      className="block w-full rounded-md border-1 bg-transparent font-bold py-1.5 pl-5 pr-5 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-center"
                                      placeholder="0"
                                      value={custom}
                                      onChange={(e) => {
                                        setCustom(Math.floor(+e.target.value));
                                      }}
                                    />
                                  </div>
                                  <div className="entrtext">Entries</div>
                                  {loadingIndex ===
                                  Math.floor((custom ?? 0) * 10) ? (
                                    <Button>
                                      <ClockLoader
                                        color={"#ffffff"}
                                        loading={true}
                                        size={20}
                                        className="m-auto"
                                      />
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        onEnterRaffle(
                                          Math.floor((custom ?? 0) * 10)
                                        )
                                      }
                                      disabled={
                                        loadingIndex > -1 &&
                                        loadingIndex !==
                                          Math.floor((custom ?? 0) * 10)
                                      }
                                    >
                                      <div className="flex items-center justify-center gap-x-1">
                                        <div>
                                          <img
                                            src={banana}
                                            className="w-[20px]"
                                            alt="banana"
                                          />
                                        </div>
                                        <div>
                                          {custom ? Math.floor(custom * 10) : "?"}{" "}
                                          Points
                                        </div>
                                      </div>
                                    </Button>
                                  )}
                                </div>
                              </Card>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 rounded-[5px] compbox-winner">
                        <div className="py-3 px-4 bg-[#1b1921] rounded-t-md font-semibold text-[16px] bordercomp">
                          <h1>Competition Ended</h1>
                          <div className="clrd">
                            {moment.utc(raffle.ended_at).fromNow()}{" "}
                            <a
                              href={`https://app.randompicker.com/protocol/${raffle.project_key}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_1442_1430)">
                                  <path
                                    d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z"
                                    fill="url(#paint0_linear_1442_1430)"
                                  />
                                </g>
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1442_1430"
                                    x1="14"
                                    y1="7.88679"
                                    x2="1.76923"
                                    y2="7.88679"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#9A34EF" />
                                    <stop offset="1" stop-color="#D826FF" />
                                  </linearGradient>
                                  <clipPath id="clip0_1442_1430">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div style={{ padding: "10px" }}>
                          <div className="rowwinner">
                            <div className="leftrow">
                              Winner
                              {winner && winner.profile_image ? (
                                <img
                                  src={winner.profile_image}
                                  className="w-[50px] rounded-full"
                                  alt=""
                                />
                              ) : (
                                <AddressAvatar 
                                  address={raffle?.winner || ZeroAddress}
                                  size={50}
                                  className="rounded-full"
                                />
                              )}
                              <div className="clrd">
                                {winner && winner.name
                                  ? winner.name
                                  : shortenAddress(raffle?.winner || ZeroAddress)}
                              </div>
                            </div>
                            <div className="rightrow w-[250px]">
                              <div className="flex flex-col">
                                <div className="flex gap-[20px]">
                                  ETH:{"  "}
                                  <a
                                    href={`https://etherscan.io/address/${
                                      raffle?.winner || ZeroAddress
                                    }`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center"
                                  >
                                    {shortenAddress(
                                      raffle?.winner || ZeroAddress
                                    )}
                                    <ShareIcon className="w-5 h-5 flex" />
                                  </a>
                                </div>
                                <div className="flex gap-[20px]">
                                  BTC:{"  "}
                                  {winner?.btc_address && (
                                    <a
                                      href={`https://www.blockchain.com/explorer/addresses/btc/${winner.btc_address}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="flex items-center"
                                    >
                                      {shortenBtcAddress(winner.btc_address)}
                                      <ShareIcon className="w-5 h-5 flex" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="rightrow mt-8">
                              <Button
                                onClick={() => {
                                  navigate("/raffles");
                                }}
                              >
                                <div className="flex items-center justify-center gap-x-1 h-[40px]">
                                  <div>Browse Competitions</div>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="particmobile">
                    <Participants
                      raffle={raffle}
                      participants={participants}
                      activities={activities}
                    />
                  </div>
                </Rightbox>
              </div>
            </div>
            {showFireworks && <Confetti />}
          </div>
        ) : (
          <></>
        )}
      </Layout>
    );
  };
  
  const Card = styled.div<{ backgroundColor?: string }>`
    background-color: ${props => props.backgroundColor || 'var(--color-overlay-dark)'};
    height: 100%;
    width: 100%;
    padding: 10px 10px;
  `;
  
  const Button = styled.button`
    width: 100%;
    background: linear-gradient(to right, #d326fd, #a232f1) padding-box,
      linear-gradient(to right, #37dcb3, #ffffff) border-box;
    border: 2px solid transparent;
    padding: 6px 6px;
    border-radius: 5px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    &:disabled {
      background: linear-gradient(to right, rgb(88 88 88), rgb(132 130 133))
          padding-box padding-box,
        linear-gradient(to right, rgb(133 166 158), rgb(255, 255, 255)) border-box
          border-box;
    }
    &:hover {
      opacity: 0.7;
    }
  `;
  
  const Leftbox = styled.div`
    width: 45%;
    padding-right: 50px;
    .imgwrapper {
      .imgtext {
        position: absolute;
        right: 20px;
        bottom: 20px;
        padding: 4px 10px;
      }
    }
  `;
  const Rightbox = styled.div`
    width: 55%;
  `;
  
  const Layout = styled.div`
    font-family: "Roboto Mono", monospace;
  
    .particmobile {
      display: none;
    }
  
    @media screen and (max-width: 900px) {
      .particmobile {
        display: block;
      }
      .particdesk {
        display: none;
      }
    }
    .boxflexouter {
      @apply flex flex-col lg:flex-row gap-8;
    }
    .compbox {
      @apply rounded-lg border border-[var(--color-text-secondary)]/50;
      background: var(--color-background);
  
      @media screen and (max-width: 600px) {
        .grid-cols-3 {
          @apply grid-cols-1;
        }
      }
  
      .bordercomp {
        @apply border-b border-[var(--color-text-secondary)]/50;
      }
  
      .compinnerbox {
        @apply rounded-lg border border-[var(--color-text-secondary)]/50 bg-[var(--color-overlay-dark)] p-3;
  
        .entrtext {
          @apply my-1 mb-2;
        }
  
        ${Button} {
          img {
            @apply h-[22px] mr-2;
          }
        }
      }
    }
  
    .compbox-winner {
      @apply rounded-lg border border-[var(--color-text-secondary)]/50 bg-[var(--color-background)];
  
      .bordercomp {
        @apply border-b border-[var(--color-text-secondary)]/50;
        
        .clrd {
          @apply flex items-center text-[var(--color-button-primary)] mt-1.5 text-sm;
        }
      }
  
      .rowwinner {
        @apply flex items-center justify-between p-2;
  
        @media screen and (max-width: 630px) {
          @apply flex-col;
          button {
            @apply mt-5;
          }
        }
  
        .leftrow {
          @apply flex items-center;
          
          img {
            @apply h-auto w-10 mx-3.5 block;
          }
          
          .clrd {
            @apply text-lg text-[var(--color-button-primary)];
          }
        }
  
        button {
          @apply px-11 py-2.5 text-lg;
        }
      }
    }
  
    .contentwrapper {
      border-radius: 6px;
      border: 1px solid rgba(128, 131, 154, 0.5);
      background: var(--black, linear-gradient(180deg, #14121b 0%, #000 100%));
      margin-top: 30px;
      .tabheader {
        margin-bottom: 14px;
        border-bottom: 1px solid rgba(128, 131, 154, 0.5);
        padding: 5px 0;
        .MuiTab-root {
          color: var(--text-grey, #fff) !important;
          text-transform: capitalize !important;
          font-size: 20px !important;
          &.Mui-selected {
            font-size: 20px !important;
            color: #d427fe !important;
          }
        }
        .MuiTabs-indicator {
          display: none !important;
        }
      }
      .tabContainer {
        max-height: 300px;
        overflow-y: scroll;
      }
      .rowwrapper {
        padding: 5px 15px;
      }
      .rwwrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(128, 131, 154, 0.5);
        padding-bottom: 18px;
        margin-bottom: 18px;
        &:last-child {
          border-bottom: 0;
        }
        width: 100%;
        .leftrw {
          display: flex;
          align-items: center;
          .nmbx {
            margin-left: 12px;
            h3 {
              font-size: 20px;
            }
            .clrd {
              color: #d427fe;
              font-size: 15px;
            }
          }
        }
        .rightrw {
          display: flex;
          align-items: center;
          font-size: 15px;
          img {
            height: 15px;
            margin-left: 8px;
          }
        }
      }
    }
  `;
  
  export default RaffleOpenPage;
  