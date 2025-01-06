import { FC } from "react";
import { Menu } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiLogoutBoxRLine, RiAccountCircleLine } from "react-icons/ri";
import { useAccount } from 'wagmi';
import { shortenAddress } from "@src/lib/utils/addressHelpers";
import useAuth from "@src/lib/hooks/useAuth";
import useUserStaked from "@src/lib/hooks/useUserStaked";
import { connectorLocalStorageKey } from "@src/lib/hooks";

interface ProfileDropdownProps {}

const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const { address } = useAccount();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { userStaked } = useUserStaked();

  return (
    <Menu>
      {({ open }) => (
        <div className="relative menubtnmobile">
          <Menu.Button
            className="mx-[20px] flex text-white border border-theme-red px-[20px] py-[12px] rounded-lg btnLogout"
          >
            <p>{shortenAddress(address || "")}</p>
            {open ? (
              <RiArrowDropUpLine className="cursor-pointer" />
            ) : (
              <RiArrowDropDownLine className="cursor-pointer" />
            )}
          </Menu.Button>
          <Menu.Items
            className="absolute top-0 left-0 translate-x-[20px] w-[180px] translate-y-[65px] flex flex-col bg-theme-dark border border-theme-grey rounded gap-2"
          >
            <Menu.Item>
              <>
                {location.pathname.includes("/staking") ||
                location.pathname.includes("/account") ||
                location.pathname.includes("/raffle") ||
                location.pathname.includes("/raffles") ? (
                  <>
                    <div className="ddrow">
                      <b>Apes Staked</b>
                      {userStaked?.staked_count || 0} Apes
                    </div>
                    <div className="ddrow">
                      <b>24hr Points Earned</b>
                      {userStaked?.daily_points || 0} Points
                    </div>
                    <div className="ddrow">
                      <b>Total Earned</b>
                      {(userStaked?.points || 0).toFixed(2)} Points
                    </div>
                  </>
                ) : null}
                <div
                  onClick={() => navigate("/account")}
                  className="px-[20px] flex gap-3 py-[12px] cursor-pointer hover:opacity-70"
                  style={{ borderTop: "1px solid rgba(128, 131, 154, 0.50)" }}
                >
                  <RiAccountCircleLine /> <span>Profile</span>
                </div>
                <div
                  onClick={() => {
                    logout();
                    window.localStorage.removeItem(connectorLocalStorageKey);
                  }}
                  className="px-[20px] flex gap-3 py-[12px] cursor-pointer hover:opacity-70"
                  style={{ borderTop: "1px solid rgba(128, 131, 154, 0.50)" }}
                >
                  <RiLogoutBoxRLine /> <span>Logout</span>
                </div>
              </>
            </Menu.Item>
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
};

export default ProfileDropdown;
