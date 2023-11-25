interface DarkModeProps {
  darkMode: boolean;

  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const DarkMode: React.FC<DarkModeProps> = ({ darkMode, onClick }) => {
  return (
    <div
      id="darkModeToggle"
      className={`absolute bottom-0 right-0 w-[80px] h-[40px] mr-7 mb-7 border rounded-[20px] cursor-pointer flex items-center px-[2px] ${
        darkMode
          ? 'justify-start border-white bg-black '
          : 'justify-end bg-white border-black'
      } transition-all duration-500`}
      onClick={onClick}
    >
      <div
        className={`darkModeSun absolute left-[2px] ml-2 transition-all duration-500 ${
          darkMode ? 'ml-0 ' : 'ml-2 '
        }`}
      ></div>
      <div
        className={`darkModeMoon absolute right-[2px] mr-2 transition-all duration-500 ${
          darkMode ? 'mr-2 ' : 'mr-0 '
        }`}
      ></div>
      <div
        id="darkModeToggleCircle"
        className={`rounded-full z-10 w-[34px] h-[34px] cursor-pointer ${
          darkMode ? 'bg-white' : 'bg-black'
        } transition-all duration-500`}
      ></div>
    </div>
  );
};
