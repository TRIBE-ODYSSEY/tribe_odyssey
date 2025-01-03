import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import moment from 'moment';
import Avatar from 'boring-avatars';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { shortenAddress } from '@src/lib/utils/addressHelpers';
import { Activity, Participant } from '@src/lib/types/raffle';

const AvatarDisplay = ({ user, address }: { user?: { profile_image: string; name: string }, address: string }) => (
  user?.profile_image ? (
    <img src={user.profile_image} className="w-12 h-12 rounded-full" alt="" />
  ) : (
    <Avatar
      size={48}
      name={address}
      variant="marble"
      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
    />
  )
);

const EntryRow = ({ data, type }: { data: Activity | Participant, type: 'activity' | 'participant' }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-600 last:border-0">
    <div className="flex items-center space-x-4">
      <AvatarDisplay user={data.user} address={data.address} />
      <div>
        <h3 className="text-white text-lg">
          {data.user?.name ?? shortenAddress(data.address)}
        </h3>
        <p className="text-purple-500">{data.entry} Entries</p>
      </div>
    </div>
    <div className="flex items-center text-gray-400 space-x-2">
      <span>{moment.utc(data.entered_at).fromNow()}</span>
      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
    </div>
  </div>
);

export const ParticipantsList: React.FC<{
  raffle: any;
  participants: Participant[];
  activities: Activity[];
}> = ({ raffle, participants, activities }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  if (!raffle || raffle.project_status !== "Open") return null;

  return (
    <div className="border border-gray-600 rounded-lg bg-gradient-to-b from-gray-800 to-black">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="border-b border-gray-600 p-2">
          {['Activity', `Participants (${participants.length})`].map((label, idx) => (
            <Tab key={idx} className={({ selected }) => `
              px-4 py-2 text-lg font-medium rounded-lg
              ${selected ? 'text-purple-500' : 'text-white'}
            `}>
              {label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="max-h-[300px] overflow-y-auto p-4">
          <Tab.Panel>
            {activities.map(activity => (
              <EntryRow key={activity.id} data={activity} type="activity" />
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {participants.map(participant => (
              <EntryRow key={participant.id} data={participant} type="participant" />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};