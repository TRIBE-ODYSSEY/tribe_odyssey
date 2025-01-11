import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import moment from 'moment';
import axios from 'axios';
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import Button from '@src/components/common/Button';

interface RaffleFormData {
  id: string;
  name: string;
  description: string;
  prize_name: string;
  nft_id: number;
  raffle_at: number;
  entry: number[];
  points: number[];
  only_allow_once: boolean;
}

interface Raffle {
  id: string;
  project_name: string;
  description: string;
  prize_image: string;
  nft_id: string;
  raffle_at: number;
  prizes: { name: string }[];
  conditions: { entry: number; points: number }[];
  only_allow_once: boolean;
}

const ADMIN_ADDRESSES = [
  '0xc570F1B8D14971c6cd73eA8db4F7C44E4AAdC6f2', // Your admin address
];

const RafflesAdmin: React.FC = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState(0);
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address || !ADMIN_ADDRESSES.includes(address)) {
      toast.error('Unauthorized access');
      navigate('/raffles');
      return;
    }
  }, [address, navigate]);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await axios.get('/staking/raffles');
        setRaffles(response.data);
      } catch (error) {
        console.error('Failed to fetch raffles:', error);
        toast.error('Failed to load raffles');
      }
    };

    fetchRaffles();
  }, [trigger]);

  const [formData, setFormData] = useState<RaffleFormData>({
    id: "",
    name: "",
    description: "",
    prize_name: "",
    nft_id: 0,
    raffle_at: 0,
    entry: [0, 0, 0, 0],
    points: [0, 0, 0, 0],
    only_allow_once: false,
  });

  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name.includes('entry') || name.includes('points')) {
      const index = parseInt(name.match(/\[(\d+)\]/)?.[1] || '0');
      const field = name.includes('entry') ? 'entry' : 'points';
      
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].map((val, i) => 
          i === index ? parseInt(value) || 0 : val
        )
      }));
      return;
    }

    if (name === 'only_allow_once') {
      setFormData(prev => ({
        ...prev,
        only_allow_once: !prev.only_allow_once
      }));
      return;
    }

    if (name === 'raffle_at') {
      setFormData(prev => ({
        ...prev,
        raffle_at: moment.utc(value).valueOf() / 1000
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!address) {
        toast.error('Please connect wallet');
        return;
      }

      // Validation
      if (formData.id === '' && !image) {
        toast.error('Please select image!');
        return;
      }

      const requiredFields = ['name', 'description', 'prize_name', 'nft_id', 'raffle_at'];
      for (const field of requiredFields) {
        if (!formData[field as keyof RaffleFormData]) {
          toast.error(`Please input ${field.replace('_', ' ')}!`);
          return;
        }
      }

      const entryPoints = formData.entry
        .map((entry, i) => ({
          entry,
          points: formData.points[i]
        }))
        .filter(ep => ep.entry > 0 && ep.points > 0);

      const form = new FormData();
      if (formData.id) form.append('id', formData.id);
      if (image) form.append('image', image);

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'entry' && key !== 'points') {
          form.append(key, String(value));
        }
      });

      form.append('conditions', JSON.stringify(entryPoints));
      form.append('address', address);

      const { data: { nonce } } = await axios.get('/user/nonce', {
        params: { address }
      });

      const signature = await signMessageAsync({
        message: `I am signing my one-time nonce: ${nonce}`
      });

      form.append('signature', signature);

      const endpoint = formData.id ? '/staking/update-raffle' : '/staking/create-raffle';
      await axios.post(endpoint, form);

      toast.success(`Successfully ${formData.id ? 'updated' : 'created'}!`);
      setTrigger(prev => prev + 1);
      navigate('/raffles');

    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to submit raffle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async (id: string) => {
    try {
      const { data: { nonce } } = await axios.get('/user/nonce', { 
        params: { address } 
      });

      const signature = await signMessageAsync({
        message: `I am signing my one-time nonce: ${nonce}`
      });

      await axios.post('/staking/finish-raffle', {
        address,
        signature,
        id
      });

      toast.success('Successfully finished!');
      setTrigger(prev => prev + 1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to finish raffle');
    }
  };

  const handleClose = async (id: string) => {
    try {
      const { data: { nonce } } = await axios.get('/user/nonce', { 
        params: { address } 
      });

      const signature = await signMessageAsync({
        message: `I am signing my one-time nonce: ${nonce}`
      });

      await axios.post('/staking/close-raffle', {
        address,
        signature,
        id
      });

      toast.success('Successfully closed!');
      setTrigger(prev => prev + 1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to close raffle');
    }
  };

  const handleEdit = (id: string) => {
    const raffle = raffles.find(r => r.id === id);
    if (!raffle) return;

    setFormData({
      id: raffle.id,
      name: raffle.project_name,
      description: raffle.description,
      prize_name: raffle.prizes[0].name,
      nft_id: +raffle.nft_id,
      raffle_at: moment.utc(raffle.raffle_at).valueOf() / 1000,
      entry: raffle.conditions.map(c => c.entry),
      points: raffle.conditions.map(c => c.points),
      only_allow_once: raffle.only_allow_once ?? false,
    });
    setImagePreview(raffle.prize_image);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <PageTitle>Raffle Administration</PageTitle>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Raffles</h2>
          <div className="space-y-4">
            {raffles.map((raffle) => (
              <div key={raffle.id} className="bg-white/5 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{raffle.project_name}</h3>
                  <p className="text-sm text-gray-400">Ends: {moment.unix(raffle.raffle_at).format('MMMM D, YYYY')}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(raffle.id)}>Edit</Button>
                  <Button onClick={() => handleClose(raffle.id)}>Close</Button>
                  <Button onClick={() => handleFinish(raffle.id)}>Finish</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-contain"/>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prize Name</label>
            <input
              type="text"
              name="prize_name"
              value={formData.prize_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">NFT ID</label>
            <input
              type="number"
              name="nft_id"
              value={formData.nft_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Raffle Date</label>
            <input
              type="datetime-local"
              name="raffle_at"
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Entry Points</label>
            {formData.entry.map((_, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="number"
                  name={`entry[${index}]`}
                  value={formData.entry[index]}
                  onChange={handleInputChange}
                  placeholder="Entry"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="number"
                  name={`points[${index}]`}
                  value={formData.points[index]}
                  onChange={handleInputChange}
                  placeholder="Points"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="only_allow_once"
              checked={formData.only_allow_once}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Only allow once
            </label>
          </div>

          <div className="pt-5">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Processing...' : formData.id ? 'Update Raffle' : 'Create Raffle'}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default RafflesAdmin;