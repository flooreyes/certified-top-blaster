import Image from "next/image";
import { useAccount } from "wagmi";
import { ConnectWallet } from "./connectWallet";


export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 ">
      <div>Logo</div>
      <ConnectWallet />
    </div>
  );
};

