/* eslint-disable react/jsx-no-target-blank */
import { FC } from "react";
import { Menu } from "@headlessui/react";

import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { connectorLocalStorageKey } from "@src/lib/hooks";
import { shortenAddress } from "@src/utils/address";
import useAuth from "@src/lib/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import useUserStaked from "@src/lib/hooks/useUserStaked";

interface UserStakedData {
  staked_count: number;
  daily_points: number;
  points: number;
}

const ProfileDropdown: FC = () => {
  const { address } = useAccount();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: userStaked } = useUserStaked(0) as { 
    data: UserStakedData | null; 
    isLoading: boolean; 
    error: string | null; 
    refetch: () => void; 
  };

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-secondary)] border border-[var(--color-button-primary)] hover:opacity-80 transition-opacity">
            <span className="font-medium">{shortenAddress(address || "")}</span>
            {open ? (
              <MdArrowDropUp className="text-xl" />
            ) : (
              <MdArrowDropDown className="text-xl" />
            )}
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-64 rounded-lg bg-[var(--color-secondary)] border border-[#2A2A2A] shadow-lg overflow-hidden">
            {(location.pathname.includes("/staking") ||
              location.pathname.includes("/account") ||
              location.pathname.includes("/raffle") ||
              location.pathname.includes("/raffles")) && (
              <div className="p-4 border-b border-[#2A2A2A]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[var(--color-text-secondary)]">Apes Staked</span>
                  <span className="text-[var(--color-text-primary)]">{userStaked?.staked_count || 0}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[var(--color-text-secondary)]">24hr Points</span>
                  <span className="text-[var(--color-text-primary)]">{userStaked?.daily_points || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text-secondary)]">Total Points</span>
                  <span className="text-[var(--color-text-primary)]">{(userStaked?.points || 0).toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/account")}
                    className={`${
                      active ? "bg-[#2A2A2A]" : ""
                    } flex items-center gap-3 w-full px-4 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors`}
                  >
                    <CgProfile className="text-lg" />
                    <span>Profile</span>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      logout();
                      window.localStorage.removeItem(connectorLocalStorageKey);
                    }}
                    className={`${
                      active ? "bg-[#2A2A2A]" : ""
                    } flex items-center gap-3 w-full px-4 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors`}
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export default ProfileDropdown;
