interface NavbarProps {
  setView: Function;
  view: 'home' | 'community' | 'shop' | 'settings';
  setSignOut: Function;
  signOut: boolean;
}

const Navbar = (props: NavbarProps) => {
  return (
    <div className=" fixed left-0 top-0 w-32 h-full bg-slate-600 flex flex-col justify-between">
      <div className="flex flex-col">
        <button
          className={`h-20 ${props.view === 'home' ? 'bg-slate-400' : ''}`}
          onClick={() => {
            props.setView('home');
            props.setSignOut(false);
          }}
        >
          Home
        </button>
        <button
          className={` h-20 ${
            props.view === 'community' ? 'bg-slate-400' : ''
          }`}
          onClick={() => {
            props.setView('community');
            props.setSignOut(false);
          }}
        >
          Community
        </button>
        <button
          className={` h-20 ${props.view === 'shop' ? 'bg-slate-400' : ''}`}
          onClick={() => {
            props.setView('shop');
            props.setSignOut(false);
          }}
        >
          Shop
        </button>
      </div>
      <div className="flex flex-col">
        <button
          className={` h-20 ${props.view === 'settings' ? 'bg-slate-400' : ''}`}
          onClick={() => {
            props.setView('settings');
            props.setSignOut(false);
          }}
        >
          Settings
        </button>
        <button
          className={` h-20`}
          onClick={() => {
            props.setSignOut(true);
            console.log(props.signOut);
            if (props.signOut) {
              props.setSignOut(false);
            }
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
export default Navbar;
