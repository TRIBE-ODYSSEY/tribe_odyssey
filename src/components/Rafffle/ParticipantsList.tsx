import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import moment from 'moment';
import makeBlockie from 'ethereum-blockies-base64';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { shortenAddress } from '@src/lib/utils/address';
import { Activity, Participant } from '@src/lib/types/raffle';

interface ParticipantsListProps {
  raffle: any;
  participants: Participant[];
  activities: Activity[];
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  raffle,
  participants,
  activities
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  if (!raffle || raffle.project_status !== "Open") return null;

  return (
    <div className="border border-gray-600 rounded-lg bg-gradient-to-b from-gray-800 to-black">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="border-b border-gray-600 p-2">
          <Tab className={({ selected }) => `
            px-4 py-2 text-lg font-medium rounded-lg
            ${selected ? 'text-purple-500' : 'text-white'}
          `}>
            Activity
          </Tab>
          <Tab className={({ selected }) => `
            px-4 py-2 text-lg font-medium rounded-lg
            ${selected ? 'text-purple-500' : 'text-white'}
          `}>
            Participants ({participants.length})
          </Tab>
        </Tab.List>

        <Tab.Panels className="max-h-[300px] overflow-y-auto p-4">
          <Tab.Panel>
            {activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {participants.map((participant) => (
              <ParticipantRow key={participant.id} participant={participant} />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const ActivityRow: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-600 last:border-0">
    <div className="flex items-center space-x-4">
      <img
        src={activity.user?.profile_image ?? makeBlockie(activity.address)}
        className="w-12 h-12 rounded-full"
        alt=""
      />
      <div>
        <h3 className="text-white text-lg">
          {activity.user?.name ?? shortenAddress(activity.address)}
        </h3>
        <p className="text-purple-500">{activity.entry} Entries</p>
      </div>
    </div>
    <div className="flex items-center text-gray-400 space-x-2">
      <span>{moment.utc(activity.entered_at).fromNow()}</span>
      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
    </div>
  </div>
);

const ParticipantRow: React.FC<{ participant: Participant }> = ({ participant }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-600 last:border-0">
    <div className="flex items-center space-x-4">
      <img
        src={participant.user?.profile_image ?? makeBlockie(participant.address)}
        className="w-12 h-12 rounded-full"
        alt=""
      />
      <div>
        <h3 className="text-white text-lg">
          {participant.user?.name ?? shortenAddress(participant.address)}
        </h3>
        <p className="text-purple-500">{participant.entry} Entries</p>
      </div>
    </div>
    <div className="flex items-center text-gray-400 space-x-2">
      <span>{moment.utc(participant.entered_at).fromNow()}</span>
      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
    </div>
  </div>
);