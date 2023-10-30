interface NavbarProps {
  setView: Function;
  view: 'home' | 'community' | 'shop' | 'settings' | 'signOut';
}

const Navbar = (props: NavbarProps) => {
  return (
    <div className=" fixed left-0 top-0 w-32 h-full bg-slate-600 flex flex-col justify-between">
      <div className="flex flex-col">
        <button
          className={`h-20 ${props.view === 'home' ? 'bg-slate-400' : ''}`}
          onClick={() => props.setView('home')}
        >
          Home
        </button>
        <button
          className={` h-20 ${
            props.view === 'community' ? 'bg-slate-400' : ''
          }`}
          onClick={() => props.setView('community')}
        >
          Community
        </button>
        <button
          className={` h-20 ${props.view === 'shop' ? 'bg-slate-400' : ''}`}
          onClick={() => props.setView('shop')}
        >
          Shop
        </button>
      </div>
      <div className="flex flex-col">
        <button
          className={` h-20 ${props.view === 'settings' ? 'bg-slate-400' : ''}`}
          onClick={() => props.setView('settings')}
        >
          Settings
        </button>
        <button
          className={` h-20 ${props.view === 'signOut' ? 'bg-slate-400' : ''}`}
          onClick={() => props.setView('signOut')}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
export default Navbar;
