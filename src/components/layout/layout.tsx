import { Header } from 'components/layout/header';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col transition-colors duration-300 ">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 h-full flex-col">
          <Header />
          <div className="h-full flex-1 bg-primary p-2 pt-[4px]">
            <div className='bg-background w-full h-full rounded-b-lg '>
              {children}
              {/* teaser blur */}
              {/* <div className='h-auto w-auto absolute top-14 right-2 left-2 bottom-2 rounded-lg bg-black/50 backdrop-blur-md'></div> */}
            </div>
          </div>
        </main>
      </div>
      <div className='absolute bottom-0 right-0 pr-4 pl-4 flex items-center justify-end h-8 bg-primary rounded-tl-lg'
        style={{
          clipPath: 'polygon(0 0, calc(100% - 0px) 0, 100% 100%, 31px 100%)',
          borderRadius: '4px',
        }}>

        <Dialog>
          <DialogTrigger>
            <div className="font-display text-black text-lg">
              {'!how-to-play?'}
            </div>
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

    </div>
  );
}
