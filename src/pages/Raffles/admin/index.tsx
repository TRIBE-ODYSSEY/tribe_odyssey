import React, { useState } from 'react';
import { useRaffleContext } from '../context/RaffleContext';
import { useAdminActions } from '../hooks/useAdminActions';
import Button from '@src/components/common/Button';
import { toast } from 'react-toastify';

const RaffleAdminPage: React.FC = () => {
  const { currentRaffle, refreshRaffles } = useRaffleContext();
  const { creditPoints, transferPoints } = useAdminActions();
  const [loading, setLoading] = useState(false);

  const [creditForm, setCreditForm] = useState({
    address: '',
    amount: 0
  });

  const [transferForm, setTransferForm] = useState({
    fromAddress: '',
    toAddress: '',
    amount: 0
  });

  const handleCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await creditPoints(creditForm.address, creditForm.amount);
      setCreditForm({ address: '', amount: 0 });
      refreshRaffles();
    } catch (error) {
      console.error('Credit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await transferPoints(transferForm.fromAddress, transferForm.toAddress, transferForm.amount);
      setTransferForm({ fromAddress: '', toAddress: '', amount: 0 });
      refreshRaffles();
    } catch (error) {
      console.error('Transfer error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Raffle Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Credit Points Form */}
        <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Credit Points</h2>
          <form onSubmit={handleCredit}>
            <input
              type="text"
              placeholder="User Address"
              className="w-full p-2 mb-4 rounded"
              value={creditForm.address}
              onChange={(e) => setCreditForm({ ...creditForm, address: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 mb-4 rounded"
              value={creditForm.amount}
              onChange={(e) => setCreditForm({ ...creditForm, amount: Number(e.target.value) })}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Credit Points'}
            </Button>
          </form>
        </div>

        {/* Transfer Points Form */}
        <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Transfer Points</h2>
          <form onSubmit={handleTransfer}>
            <input
              type="text"
              placeholder="From Address"
              className="w-full p-2 mb-4 rounded"
              value={transferForm.fromAddress}
              onChange={(e) => setTransferForm({ ...transferForm, fromAddress: e.target.value })}
            />
            <input
              type="text"
              placeholder="To Address"
              className="w-full p-2 mb-4 rounded"
              value={transferForm.toAddress}
              onChange={(e) => setTransferForm({ ...transferForm, toAddress: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 mb-4 rounded"
              value={transferForm.amount}
              onChange={(e) => setTransferForm({ ...transferForm, amount: Number(e.target.value) })}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Transfer Points'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RaffleAdminPage; 