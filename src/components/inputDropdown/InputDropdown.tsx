import React from "react";

interface InputDropdownProps {
  placeholder: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selected: any[];
  handleSelect: (character: any) => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  placeholder,
  query,
  setQuery,
  selected,
  handleSelect,
  toggleDropdown,
  isDropdownOpen,
}) => {
  return (
    <div className="relative flex items-center border p-2 rounded-lg flex-wrap bg-white">
      {selected.map((char) => (
        <div
          key={char.id}
          className="flex items-center gap-2 bg-gray-200 py-1 px-2 rounded-full mr-2 mb-2"
        >
          <span className="text-[#3D4B5D]">{char.name}</span>
          <button
            onClick={() => handleSelect(char)}
            className="text-white bg-slate-500 grid place-items-center rounded-lg px-2 py-1 hover:bg-opacity-80 transition-all duration-150"
          >
            <span className="font-semibold text-xs">X</span>
          </button>
        </div>
      ))}
      <div className="relative flex-grow flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow outline-none py-1 px-2 rounded-lg border-none"
        />
        <button
          onClick={toggleDropdown}
          className="absolute inset-y-0 right-2 flex items-center px-2 text-[#3D4B5D]"
        >
          {isDropdownOpen ? "▲" : "▼"}
        </button>
      </div>
    </div>
  );
};

export default InputDropdown;
