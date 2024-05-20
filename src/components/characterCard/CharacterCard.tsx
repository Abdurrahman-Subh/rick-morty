import React from "react";

interface CharacterCardProps {
  character: {
    id: number;
    name: string;
    image: string;
    episode: string[];
  };
  isSelected: boolean;
  onSelect: (character: any) => void;
  highlightQuery: (text: string, query: string) => React.ReactNode;
  query: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSelected,
  onSelect,
  highlightQuery,
  query,
}) => {
  return (
    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(character)}
        className="form-checkbox"
        id={`checkbox-${character.id}`}
      />
      <label
        htmlFor={`checkbox-${character.id}`}
        className="flex items-center gap-2 w-full cursor-pointer"
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-8 h-8 rounded"
        />
        <div className="flex flex-col items-start justify-start">
          <span className="text-[#48566A] font-medium">
            {highlightQuery(character.name, query)}
          </span>
          <span className="w-full text-[#64748B] text-sm">
            {character.episode.length} Episodes
          </span>
        </div>
      </label>
    </li>
  );
};

export default CharacterCard;
