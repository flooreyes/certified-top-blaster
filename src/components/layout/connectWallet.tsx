import Image from "next/image";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { modal } from "@reown/appkit/react";


export const ConnectWallet = () => {

  const { isConnected, address } = useAccount();
  const truncatedAddress = address?.slice(0, 8);

  
  return (
    <div className='absolute top-0 right-0 pr-3 pl-2 flex items-center justify-end h-7 bg-primary rounded-tl-lg'
      style={{
        clipPath: 'polygon(7px 0, 100% 0, 100% 100%, 0 100%)',
        borderRadius: '4px',
      }}>
      <Button variant={'ghost'} className="w-full cursor-pointer font-display p-0 text-black text-lg bg-transparent" onClick={() => {
        modal?.open()
      }}>
        {isConnected ?
          <div>
            {`${truncatedAddress}}`}
          </div> :
          <div>
            {'<SIGN---IN)'}
          </div>
        }
      </Button>
    </div>
  );
};
