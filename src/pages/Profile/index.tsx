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
          .catch(() => {
            toast.error("Failed to Sign Message!");
            setLoading(false);
          });
      });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <PageTitle>Profile</PageTitle>
        </div>
        
        {address ? (
          <div className="flex flex-col items-center space-y-8">
            {/* Avatar Section */}
            <div className="relative group">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-[180px] h-[180px] rounded-full object-cover"
                />
              ) : (
                <AddressAvatar 
                  address={address} 
                  size={180} 
                  className="rounded-full"
                />
              )}
              <button
                className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center rounded-full"
                onClick={() => hiddenFileInput.current?.click()}
              >
                <PencilIcon className="w-8 h-8 text-white" />
              </button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleImageChange}
              />
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">
                {user?.name || shortenAddress(address)}
              </h2>
              <p className="text-theme-grey">{address}</p>
            </div>

            {/* Profile Form */}
            <div className="w-full max-w-xl space-y-6 bg-[#1a1b1f] rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <input
                  className="w-full h-12 px-4 rounded-lg border border-[#80839a80] bg-transparent outline-none text-white transition-colors hover:border-[#E5E5E5] focus:border-[#E5E5E5]"
                  type="text"
                  placeholder="Enter Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  className="w-full h-12 px-4 rounded-lg border border-[#80839a80] bg-transparent outline-none text-white transition-colors hover:border-[#E5E5E5] focus:border-[#E5E5E5]"
                  type="text"
                  placeholder="Enter Your Twitter or Discord username"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />

                <div>
                  <label className="text-sm text-theme-grey mb-2 block">ETH Address</label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-[#80839a80] bg-transparent outline-none text-white transition-colors"
                    type="text"
                    value={address}
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-sm text-theme-grey mb-2 block">BTC Ordinals Address</label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-[#80839a80] bg-transparent outline-none text-white transition-colors hover:border-[#E5E5E5] focus:border-[#E5E5E5]"
                    type="text"
                    placeholder="Enter BTC Ordinals Address"
                    value={btcAddr}
                    onChange={(e) => setBtcAddr(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4">
                {loading ? (
                  <Button className="w-full">
                    <ClockLoader color="#ffffff" loading size={20} />
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
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white">
              Please connect your wallet
            </h2>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
