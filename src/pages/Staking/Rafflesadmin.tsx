import React, { FC, useState } from "react";
import Button from "@src/components/common/Button";
import styled from "styled-components";
import * as moment from "moment";
import { toast } from "react-toastify";
import { useWeb3React } from "@src/lib/hooks/useWeb3React";
import { useSignMessage } from "wagmi";
import axios from "axios";
import useRaffles from "@src/lib/hooks/useRaffles";
import { useNavigate } from "react-router-dom";

interface RaffleAdminPageProps {}

const RaffleAdminPage: FC<RaffleAdminPageProps> = () => {
  const { account } = useWeb3React();
  const { signMessageAsync } = useSignMessage();

  const [trigger, setTrigger] = useState(0);
  const { raffles } = useRaffles(false, trigger);
  const history = useNavigate();

  const [data, setData] = useState<{
    id: string;
    name: string;
    description: string;
    prize_name: string;
    nft_id: number;
    raffle_at: number;
    entry: number[];
    points: number[];
    only_allow_once: boolean;
  }>({
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
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onChangeData = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    switch (name) {
      case "id":
        setData({
          ...data,
          id: value,
        });
        break;
      case "name":
        setData({
          ...data,
          name: value,
        });
        break;
      case "description":
        setData({
          ...data,
          description: value,
        });
        break;
      case "prize_name":
        setData({
          ...data,
          prize_name: value,
        });
        break;
      case "nft_id":
        setData({
          ...data,
          nft_id: value,
        });
        break;
      case "only_allow_once":
        setData({
          ...data,
          only_allow_once: !data.only_allow_once,
        });
        break;
      case "raffle_at":
        setData({
          ...data,
          raffle_at: moment.utc(value).valueOf() / 1000,
        });
        break;
      default:
        break;
    }

    if (name.includes("entry")) {
      const temp = { ...data };
      temp.entry[parseInt(name.match(/\[(\d+)\]/)[1])] = parseInt(value);
      setData(temp);
    }

    if (name.includes("points")) {
      const temp = { ...data };
      temp.points[parseInt(name.match(/\[(\d+)\]/)[1])] = parseInt(value);
      setData(temp);
    }
  };

  const submitForm = () => {
    // check
    if (!account) {
      toast.error("Please connect wallet");
      return;
    }
    if (data.id === "" && !image) {
      toast.error("Please select image!");
      return;
    }
    if (!data.name) {
      toast.error("Please input project name!");
      return;
    }
    if (!data.description) {
      toast.error("Please input project description!");
      return;
    }
    if (!data.prize_name) {
      toast.error("Please input prize name!");
      return;
    }
    if (!data.nft_id) {
      toast.error("Please input nft ID!");
      return;
    }
    if (!data.raffle_at) {
      toast.error("Please select end date!");
      return;
    }
    const entryPoints: { entry: number; points: number }[] = [];
    for (let i = 0; i < data.entry.length; i++) {
      if (data.entry[i] > 0 && data.points[i] > 0) {
        entryPoints.push({
          entry: data.entry[i],
          points: data.points[i],
        });
      }
    }

    const formData = new FormData();
    if (data.id !== "") {
      formData.append("id", data.id);
    }
    if (image) {
      formData.append("image", image);
    }

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("nftId", String(data.nft_id));
    formData.append("prizeName", data.prize_name);
    formData.append("onlyAllowOnce", data.only_allow_once ? "true" : "false");
    formData.append("raffleAt", String(data.raffle_at));
    formData.append("conditions", JSON.stringify(entryPoints));
    formData.append("address", account);

    axios
      .get("/user/nonce", { params: { address: account } })
      .then(async (response) => {
        const nonce = response.data.nonce;
        const signature = await signMessageAsync({
          message: `I am signing my one-time nonce: ${nonce}`,
        });

        formData.append("signature", signature);
        axios
          .post(
            data.id !== ""
              ? "/staking/update-raffle"
              : "/staking/create-raffle",
            formData
          )
          .then((response) => {
            toast.success(
              `Successfully ${data.id === "" ? "created" : "updated"}!!`
            );
          })
          .catch((error) => {
            console.error(error);
            toast.error(error?.response?.data?.error);
          })
          .finally(() => {
            setTrigger((prev) => prev + 1);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinish = (id: string) => {
    axios
      .get("/user/nonce", { params: { address: account } })
      .then(async (response) => {
        const nonce = response.data.nonce;
        const signature = await signMessageAsync({
          message: `I am signing my one-time nonce: ${nonce}`,
        });

        axios
          .post("/staking/finish-raffle", {
            address: account,
            signature,
            id: id,
          })
          .then((response) => {
            toast.success("Successfully finished!!");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onClose = (id: string) => {
    axios
      .get("/user/nonce", { params: { address: account } })
      .then(async (response) => {
        const nonce = response.data.nonce;
        const signature = await signMessageAsync({
          message: `I am signing my one-time nonce: ${nonce}`,
        });

        axios
          .post("/staking/close-raffle", {
            address: account,
            signature,
            id: id,
          })
          .then((response) => {
            toast.success("Successfully finished!!");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onEdit = (id: string) => {
    const raffle = raffles.find((r) => r.id === id);
    if (!raffle) {
      return;
    }

    setData({
      id: raffle.id,
      name: raffle.project_name,
      description: raffle.description,
      prize_name: raffle.prizes[0].name,
      nft_id: +raffle.nft_id,
      raffle_at: moment.utc(raffle.raffle_at).valueOf() / 1000,
      entry: raffle.conditions.map((c) => c.entry),
      points: raffle.conditions.map((c) => c.points),
      only_allow_once: raffle.only_allow_once ?? false,
    });
    setImagePreview(raffle.prize_image);
  };

  return (
    <Layout>
      <div className="mt-8 max-w-md text-black mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-500">
              Raffle ID(Optional for updating)
            </span>
            <input
              type="text"
              className="mt-1 block w-full"
              placeholder=""
              name="id"
              value={data?.id}
              onChange={onChangeData}
            />
          </label>
          <label className="block">
            <span className="text-gray-500">Prize Image</span>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              placeholder=""
              onChange={onImageChange}
            />
            {imagePreview && <img alt="preview image" src={imagePreview} />}
          </label>
          <label className="block">
            <span className="text-gray-500">Raffle Name</span>
            <input
              type="text"
              className="mt-1 block w-full"
              placeholder=""
              name="name"
              value={data?.name}
              onChange={onChangeData}
            />
          </label>
          <label className="block">
            <span className="text-gray-500">Description</span>
            <textarea
              className="mt-1 block w-full"
              name="description"
              value={data?.description}
              onChange={onChangeData}
            ></textarea>
          </label>
          <label className="block">
            <span className="text-gray-500">Prize Name</span>
            <input
              type="text"
              className="mt-1 block w-full"
              placeholder=""
              name="prize_name"
              value={data?.prize_name}
              onChange={onChangeData}
            />
          </label>
          <label className="block">
            <span className="text-gray-500">Prize Token Id</span>
            <input
              type="number"
              className="mt-1 block w-full"
              placeholder=""
              name="nft_id"
              value={data?.nft_id}
              onChange={onChangeData}
            />
          </label>
          <label className="block">
            <span className="text-gray-500">End Date</span>
            <input
              type="datetime-local"
              className="mt-1 block w-full"
              name="raffle_at"
              value={moment
                .utc(data?.raffle_at * 1000)
                .format("YYYY-MM-DDTHH:mm")}
              onChange={onChangeData}
            />
          </label>
          <label className="block">
            <span className="text-gray-500">Condition1</span>
            <div className=" grid grid-cols-2 gap-4">
              <span className="text-gray-500">Entry:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="entry-0"
                name="entry[0]"
                value={data?.entry?.[0]}
                onChange={onChangeData}
              />
              <span className="text-gray-500">Points:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="points-0"
                name="points[0]"
                value={data?.points?.[0]}
                onChange={onChangeData}
              />
            </div>
          </label>
          <label className="block">
            <span className="text-gray-500">Condition2</span>
            <div className=" grid grid-cols-2 gap-4">
              <span className="text-gray-500">Entry:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="entry-1"
                name="entry[1]"
                value={data?.entry?.[1]}
                onChange={onChangeData}
              />
              <span className="text-gray-500">Points:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="points-1"
                name="points[1]"
                value={data?.points?.[1]}
                onChange={onChangeData}
              />
            </div>
          </label>
          <label className="block">
            <span className="text-gray-500">Condition3</span>
            <div className=" grid grid-cols-2 gap-4">
              <span className="text-gray-500">Entry:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="entry-2"
                name="entry[2]"
                value={data?.entry?.[2]}
                onChange={onChangeData}
              />
              <span className="text-gray-500">Points:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="points-2"
                name="points[2]"
                value={data?.points?.[2]}
                onChange={onChangeData}
              />
            </div>
          </label>
          <label className="block">
            <span className="text-gray-500">Condition4</span>
            <div className=" grid grid-cols-2 gap-4">
              <span className="text-gray-500">Entry:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="entry-3"
                name="entry[3]"
                value={data?.entry?.[3]}
                onChange={onChangeData}
              />
              <span className="text-gray-500">Points:</span>
              <input
                type="number"
                className="mt-0 block w-full"
                placeholder=""
                id="points-3"
                name="points[3]"
                value={data?.points?.[3]}
                onChange={onChangeData}
              />
            </div>
          </label>
          <label className="block">
            <div className=" grid grid-cols-2 gap-4">
              <span className="text-gray-500">Only allow entry one</span>

              <input
                type="checkbox"
                className="form-checkbox rounded text-pink-500"
                name="only_allow_once"
                checked={data?.only_allow_once}
                onChange={onChangeData}
              />
            </div>
          </label>
          <Button onClick={submitForm}>
            <div className="flex items-center justify-center gap-x-1">
              <div>Submit</div>
            </div>
          </Button>
        </div>
      </div>
      <div className="text-white mt-16">
        <div className="pt-15 max-w-[900px] mx-auto">
          <div className="text-center">
            <h2 className="text-center font-bold text-[20px] tracking-widest">
              All Raffles
            </h2>
          </div>
          <div className="mt-10  gap-x-6">
            <div className="grid grid-cols-4 gap-4">
              {(raffles || []).map((raffle) => (
                <div className="cardwrapper" key={raffle.id}>
                  <Card>
                    <div className="relative">
                      <img src={raffle.prize_image} alt="" />
                      <div className="absolute bottom-2  flex justify-between w-full text-[12px] px-2">
                        <div
                          className="bg-[#ffffff] font-semibold py-1 px-2 rounded-full"
                          style={{ color: "#80839A" }}
                        >
                          #{raffle.nft_id}
                        </div>
                        <div className="bg-[#ffc700] text-black font-bold px-2 py-1 rounded-full whitespace-nowrap">
                          {raffle.project_status === "Open"
                            ? `${moment
                                .utc(raffle.raffle_at)
                                .diff(moment.utc(), "days")} Days Left`
                            : `Finished`}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="py-2">
                        <h4>{raffle.project_name}</h4>
                        <p
                          className="mt-1 text-xs"
                          style={{ color: "#80839A" }}
                        >
                          Raffle ID: #{raffle.id}
                        </p>
                      </div>
                      <Button
                        className="mx-auto"
                        onClick={() => history.push(`/raffle/${raffle.id}`)}
                      >
                        Enter Now
                      </Button>
                      <Button
                        className="mx-auto mt-2"
                        onClick={() => onEdit(raffle.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="mx-auto mt-2"
                        onClick={() => onFinish(raffle.id)}
                        disabled={raffle.project_status !== "Open"}
                      >
                        Draw
                      </Button>
                      <Button
                        className="mx-auto mt-2"
                        onClick={() => onClose(raffle.id)}
                        disabled={raffle.project_status !== "Open"}
                      >
                        Delete
                      </Button>
                      <div
                        className="py-3  font-semibold text-center"
                        style={{
                          color: "#80839A",
                          fontSize: "12px",
                        }}
                      >
                        {raffle.entry_count || 0} ENTRIES
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  font-family: "Roboto Mono", monospace;
  .boxflexouter {
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 900px) {
      flex-direction: column-reverse;
    }
  }
  button {
    height: 35px;
  }
`;
const Card = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(128, 131, 154, 0.5);
  border-radius: 6px;
  padding: 10px 10px;
`;

export default RaffleAdminPage;
