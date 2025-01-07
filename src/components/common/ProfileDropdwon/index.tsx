import { FC } from "react";
import { Menu } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiLogoutBoxRLine, RiAccountCircleLine } from "react-icons/ri";
import { useAccount } from 'wagmi';
import useAuth from "@src/lib/hooks/useAuth";
import useUserStaked from "@src/lib/hooks/useUserStaked";
import { connectorLocalStorageKey } from "@src/lib/hooks";

interface ProfileDropdownProps {
  trigger: number;
}

const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const { address, isConnected } = useAccount();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { userStaked } = useUserStaked(0);

  if (!isConnected || !address) return null;

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem(connectorLocalStorageKey);
  };

  // Format address manually
  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <Menu>
      {({ open }) => (
        <div className="relative">
          <Menu.Button
            className="flex items-center gap-2 text-white bg-theme-dark hover:bg-theme-dark/80 px-4 py-2 rounded-lg transition-colors"
          >
            <p>{displayAddress}</p>
            {open ? (
              <RiArrowDropUpLine className="text-xl" />
            ) : (
              <RiArrowDropDownLine className="text-xl" />
            )}
          </Menu.Button>
          <Menu.Items
            className="absolute right-0 mt-2 w-[200px] rounded-lg bg-theme-dark border border-theme-grey shadow-lg overflow-hidden"
          >
            <div className="py-2">
              {(location.pathname.includes("/staking") ||
                location.pathname.includes("/account") ||
                location.pathname.includes("/raffle") ||
                location.pathname.includes("/raffles")) && (
                <div className="px-4 py-2 space-y-2 border-b border-theme-grey/50">
                  <div className="flex justify-between text-sm">
                    <b>Apes Staked</b>
                    <span>{userStaked?.staked_count || 0} Apes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <b>24hr Points Earned</b>
                    <span>{userStaked?.daily_points || 0} Points</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <b>Total Earned</b>
                    <span>{(userStaked?.points || 0).toFixed(2)} Points</span>
                  </div>
                </div>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleProfileClick}
                    className={`${
                      active ? 'bg-theme-grey/10' : ''
                    } w-full px-4 py-2 flex items-center gap-2 text-sm text-white hover:text-white/90`}
                  >
                    <RiAccountCircleLine className="text-lg" />
                    <span>Profile</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? 'bg-theme-grey/10' : ''
                    } w-full px-4 py-2 flex items-center gap-2 text-sm text-white hover:text-white/90`}
                  >
                    <RiLogoutBoxRLine className="text-lg" />
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
};

export default ProfileDropdown;
