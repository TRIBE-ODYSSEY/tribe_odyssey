import { FC, useEffect, useRef, useState } from "react";
import { ClockLoader } from "react-spinners";
import Button from "@src/components/common/Button";
import { useWeb3React } from "@src/lib/hooks/useWeb3React";
import { toast } from "react-toastify";
import { useSignMessage } from "wagmi";
import axios from "axios";
import useUserInfo from "@src/lib/hooks/useUserInfo";
import { shortenAddress } from "@src/lib/utils/formatters";
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { PencilIcon } from "@heroicons/react/24/outline";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  const { account } = useWeb3React();
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
    if (user && account) {
      if (user.address !== account.toLowerCase()) {
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
  }, [user, account, username, btcAddr, twitter]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const onSave = async () => {
    if (!account) {
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
    try {
      const nonceResponse = await axios.get("/user/nonce", {
        params: { address: account },
      });
      
      const nonce = nonceResponse.data.nonce;
      const msg = `I am signing my one-time nonce: ${nonce}`;
      
      const signed = await signMessageAsync({ message: msg });
      
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("address", account);
      formData.append("username", username);
      formData.append("twitter", twitter);
      formData.append("btc", btcAddr);
      formData.append("signature", signed);

      const response = await axios.post("/user/update", formData);
      
      if (response.data.success) {
        toast.success("Successfully saved!");
      } else {
        toast.error(response.data.error);
      }
      
      setTrigger(prev => prev + 1);
      
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to save!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[80px]">
      {account ? (
        <div className="text-center flex flex-col gap-[20px] max-w-[800px] mx-auto">
          <div className="mx-auto group relative">
            <img
              src={imagePreview ?? user?.profile_image ?? createAvatar(identicon, { seed: account }).toDataURL()}
              alt="Profile"
              className="w-[180px] h-[180px] rounded-full"
            />
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
            {user?.name || (account ? shortenAddress(account) : "")}
          </p>
          <p className="text-theme-grey">{account}</p>

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
              value={account || ""}
              readOnly
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
                  disabled={!account || !username || !btcAddr}
                >
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-theme text-white font-bold text-[28px]">
            No found!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
