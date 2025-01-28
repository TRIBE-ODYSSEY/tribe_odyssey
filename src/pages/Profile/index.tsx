import { FC, useEffect, useRef, useState } from "react";
import { ClockLoader } from "react-spinners";
import Button from "@src/components/common/Button";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useSignMessage } from "wagmi";
import axios from "axios";
import useUserInfo from "@src/lib/hooks/useUserInfo";
import { shortenAddress } from "@src/utils/address";
import { PencilIcon } from "@heroicons/react/24/outline";
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import AddressAvatar from '@src/components/common/AddressAvatar';

const ProfilePage: FC = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [trigger, setTrigger] = useState(0);
  const user = useUserInfo(trigger);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [btcAddr, setBtcAddr] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && address) {
      if (user.address !== address.toLowerCase()) {
        setUsername("");
        setBtcAddr("");
        setTwitter("");
        setTrigger((prev) => prev + 1);
        return;
      }

      if (username === "") {
        setUsername(user?.name || "");
      }

      if (btcAddr === "") {
        setBtcAddr(user.btc_address || "");
      }

      if (twitter === "") {
        setTwitter(user.twitter || "");
      }
    }
  }, [user, address, username, btcAddr, twitter]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSave = async () => {
    if (!address) {
      toast.error("Please connect wallet to update!");
      return;
    }
    if (!btcAddr) {
      toast.error("Please input valid Ordinal Receiving Address!");
      return;
    }
    if (!username) {
      toast.error("Please input valid Username!");
      return;
    }

    setLoading(true);
    axios
      .get("/user/nonce", {
        params: { address: address },
      })
      .then((response) => {
        const nonce = response.data.nonce;
        const msg = `I am signing my one-time nonce: ${nonce}`;
        signMessageAsync({ message: msg })
          .then((signed) => {
            const formData = new FormData();
            formData.append("image", image!);
            formData.append("address", address);
            formData.append("username", username);
            formData.append("twitter", twitter);
            formData.append("btc", btcAddr);
            formData.append("signature", signed);

            axios
              .post("/user/update", formData)
              .then((res) => {
                if (res.data.success) {
                  toast.success("Successfully saved!");
                } else {
                  toast.error(res.data.error);
                }
              })
              .catch((e) => {
                console.log(e);
                if (e.response?.data?.error) {
                  toast.error(e.response?.data?.error);
                } else {
                  toast.error("Failed to save!");
                }
              })
              .finally(() => {
                setTrigger((prev) => prev + 1);
                setLoading(false);
              });
          })
          .catch((e) => {
            toast.error("Failed to Sign Message!");
            setLoading(false);
          });
      });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <PageTitle>Profile</PageTitle>
        
        {address ? (
          <div className="text-center flex flex-col gap-[20px] max-w-[800px] mx-auto">
            <div className="mx-auto group relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt=""
                  className="w-[180px] h-[180px] rounded-full"
                />
              ) : (
                <AddressAvatar 
                  address={address} 
                  size={180} 
                  className="rounded-full"
                />
              )}
              <button
                className="text-white hidden group-hover:flex absolute w-[180px] h-[180px] mt-[-180px]"
                onClick={() => hiddenFileInput.current?.click()}
              >
                <PencilIcon className="m-auto" />
              </button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleImageChange}
              />
            </div>
            <p className="text-theme text-white font-bold text-[28px]">
              {user?.name || (address ? shortenAddress(address) : "")}
            </p>
            <p className="text-theme-grey">{address}</p>

            <div className="flex items-start gap-[10px] flex-col  border border-[#80839a80] rounded-lg p-[40px] ens-box-gradient mt-8 max-w-[600px] min-w-[400px]">
              <p>Personal Information</p>
              <input
                className="h-[50px] rounded-lg border border-[#80839a80] w-full bg-transparent outline-none text-white px-4 hover:border-[#E5E5E5] focus:border-[#E5E5E5] ens-box-gradient"
                type="text"
                placeholder="Enter Your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <p className="mt-4">Contact Information (Twitter, Discord etc)</p>
              <input
                className="h-[50px] rounded-lg border border-[#80839a80] w-full bg-transparent outline-none text-white px-4 hover:border-[#E5E5E5] focus:border-[#E5E5E5] ens-box-gradient"
                type="text"
                placeholder="Enter Your Twitter or Discord username"
                value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
              />
              <p className="mt-4">Wallet Information</p>
              <div className="text-theme-grey text-[12px]">Eth Address</div>
              <input
                className="h-[50px] rounded-lg border border-[#80839a80] w-full bg-transparent outline-none text-white px-4 hover:border-[#E5E5E5] focus:border-[#E5E5E5] ens-box-gradient"
                type="text"
                placeholder="Enter Eth Address"
                value={address || ""}
                readOnly
                onChange={(e) => {}}
              />
              <div className="text-theme-grey text-[12px]">
                Btc Ordinals Address
              </div>
              <input
                className="h-[50px] rounded-lg border border-[#80839a80] w-full bg-transparent outline-none text-white px-4 hover:border-[#E5E5E5] focus:border-[#E5E5E5] ens-box-gradient"
                type="text"
                placeholder="Enter BTC Ordinals Address"
                value={btcAddr}
                onChange={(e) => {
                  setBtcAddr(e.target.value);
                }}
              />

              <div className="flex items-center w-full mt-4">
                {loading ? (
                  <Button className="w-full">
                    <ClockLoader
                      color={"#ffffff"}
                      loading={true}
                      size={20}
                      className="w-full"
                    />
                  </Button>
                ) : (
                  <Button
                    onClick={onSave}
                    className="w-full"
                    disabled={!address || !username || !btcAddr}
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-theme text-white font-bold text-[28px]">
              Please connect your wallet
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
