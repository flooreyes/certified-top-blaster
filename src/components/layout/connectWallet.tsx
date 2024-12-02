import Image from "next/image";
import { useAccount } from "wagmi";


export const ConnectWallet = () => {

  const { isConnected, address } = useAccount();
  return (

    <div className="relative h-10 w-auto ">
      {isConnected ? (
        <div className="font-blast text-primary">
          {'(SIGN---OUT>'}
        </div>
      ) : (
        <div className="cursor-pointer flex items-center justify-center h-full pt-1">
          <Image src="/images/signin.svg" alt="logo" className="h-6 w-auto" width={800} height={300} />
        </div>
      )}
      <div className="opacity-0 absolute right-0 top-0">
        {
          isConnected ? (
            <w3m-button label="Sign Out" />
          ) : (
            <w3m-connect-button label="Sign In to top blaster" />
          )
        }
      </div>
    </div>
  );
};
