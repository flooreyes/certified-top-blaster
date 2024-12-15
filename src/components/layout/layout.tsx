import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog"
import Image from 'next/image';
import { useAccount } from "wagmi";
import { ConnectWallet } from "./connectWallet";
import { Button } from "../ui/button";


export default function Layout({ children }: { children: React.ReactNode }) {

  const { isConnected } = useAccount();

  return (
    <div className="flex h-screen w-screen flex-col transition-colors duration-300 ">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 h-full flex-col">
          <div className="h-full flex-1 bg-primary p-2 ">
            <div className='bg-background w-full h-full rounded-b-lg pt-12 px-2 pb-8'>
              {children}
              {/* teaser blur */}
              {/* <div className='h-auto w-auto absolute top-14 right-2 left-2 bottom-2 rounded-lg bg-black/50 backdrop-blur-md'></div> */}
            </div>
          </div>
        </main>
      </div>
      {/* logo */}
      <div className="absolute top-0 left-0 bg-gradient-to-r from-primary to-transparent lg:w-90 ">
        <Image src="/images/logo2.svg" alt="logo" className="w-[52vw] h-full sm:w-90 " width={800} height={300} />
      </div>
      {/* Account*/}
      <ConnectWallet />
      {/* Hall of Fame button */}
      <div className='absolute bottom-0 left-0 pr-4 pl-2 flex items-center justify-end h-6 bg-primary rounded-tl-lg z-10'
        style={{
          clipPath: 'polygon(8px 0, 100% 0, 88% 100%, 0 100%)',
          borderRadius: '4px',
        }}>
        <Dialog>
          <DialogTrigger>
            <Button variant={'ghost'} className="p-0 font-display text-black text-sm sm:text-base md:text-lg cursor-pointer">
              {'!HALL_OF_FAME?'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {/* info button */}
      <div className='absolute bottom-0 right-0 px-2 flex items-center justify-end h-6 md:h-7 bg-primary rounded-l-xl z-10'
        style={{
          clipPath: 'polygon(7px 0, 100% 0, 100% 100%, 0 100%)',
        }}>
        <Dialog>
          <DialogTrigger>
            <Button variant={'ghost'} className="p-0 font-display text-black text-sm sm:text-base md:text-lg cursor-pointer">
              {'(how_to-_play}'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {/* mobile border */}
      <div className="h-4 bottom-0 w-full z-0 bg-primary sm:hidden"></div>    </div>
  );
}
