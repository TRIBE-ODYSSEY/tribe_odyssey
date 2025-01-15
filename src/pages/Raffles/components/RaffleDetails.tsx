import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useRaffle } from '../hooks/useRaffle';
import PageTitle from '@src/components/common/PageTitle';
import AddressAvatar from '@src/components/common/AddressAvatar';
import { shortenAddress } from '@src/utils/address';

const RaffleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { raffle, participants, activities, winner, loading, error } = useRaffle(id, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (error || !raffle) {
    return (
      <div className="text-center text-red-500 py-8">
        {error || 'Raffle not found'}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <PageTitle>{raffle.project_name}</PageTitle>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Left Column - Raffle Info */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Raffle Details</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Status:</span>
                <span className={`ml-2 ${raffle.project_status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {raffle.project_status}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Start Date:</span>
                <span className="ml-2">{moment(raffle.raffle_at).format('MMM D, YYYY HH:mm')}</span>
              </div>
              <div>
                <span className="text-gray-400">End Date:</span>
                <span className="ml-2">{moment(raffle.endDate).format('MMM D, YYYY HH:mm')}</span>
              </div>
              <div>
                <span className="text-gray-400">Total Entries:</span>
                <span className="ml-2">{raffle.entry_count.toLocaleString()}</span>
              </div>
            </div>

            {winner && (
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Winner</h3>
                <div className="flex items-center gap-4">
                  <AddressAvatar address={winner.address} size={48} className="rounded-full" />
                  <div>
                    <div className="font-medium">{winner.user?.name ?? shortenAddress(winner.address)}</div>
                    <div className="text-sm text-gray-400">
                      Won with entry #{winner.winning_entry} of {winner.entry} total entries
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Entry Conditions</h2>
            <div className="space-y-2">
              {raffle.conditions.map((condition, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span>{condition.points} Points</span>
                  <span>{condition.entry} Entries</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Participants & Activity */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activities?.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AddressAvatar address={activity.address} size={32} className="rounded-full" />
                    <div>
                      <div className="font-medium">{activity.user?.name ?? shortenAddress(activity.address)}</div>
                      <div className="text-sm text-gray-400">{activity.entry} Entries</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {moment(activity.entered_at).fromNow()}
                  </div>
                </div>
              ))}
              {(!activities || activities.length === 0) && (
                <div className="text-center text-gray-400 py-4">
                  No recent activity
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Top Participants</h2>
            <div className="space-y-3">
              {participants?.slice(0, 5).map((participant) => (
                <div key={participant.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AddressAvatar address={participant.address} size={32} className="rounded-full" />
                    <div>
                      <div className="font-medium">{participant.user?.name ?? shortenAddress(participant.address)}</div>
                      <div className="text-sm text-gray-400">{participant.entry} Entries</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {moment(participant.entered_at).fromNow()}
                  </div>
                </div>
              ))}
              {(!participants || participants.length === 0) && (
                <div className="text-center text-gray-400 py-4">
                  No participants yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RaffleDetails;