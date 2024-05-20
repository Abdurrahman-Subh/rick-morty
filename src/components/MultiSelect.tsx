import React, { useState, useEffect } from "react";
import CharacterCard from "./characterCard";
import InputDropdown from "./inputDropdown";

interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

interface MultiSelectProps {
  placeholder: string;
}

const highlightQuery = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="font-bold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Character[]>([]);
  const [selected, setSelected] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchCharacters = async (query: string = "") => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );
      const data = await response.json();
      setResults(data.results || []);
      setIsDropdownOpen(true);
    } catch (err) {
      setError("Failed to fetch characters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      fetchCharacters(query);
    } else {
      setResults([]);
      setIsDropdownOpen(false);
    }
  }, [query]);

  const handleSelect = (character: Character) => {
    if (selected.some((char) => char.id === character.id)) {
      setSelected(selected.filter((char) => char.id !== character.id));
    } else {
      setSelected([...selected, character]);
    }
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      fetchCharacters();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full max-w-md mx-auto px-2 md:px-0">
      <div className="relative">
        <InputDropdown
          placeholder={placeholder}
          query={query}
          setQuery={setQuery}
          selected={selected}
          handleSelect={handleSelect}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
        />
        {loading && (
          <div className="absolute inset-x-0 top-full mt-2 bg-white border rounded p-2">
            Loading...
          </div>
        )}
        {error && (
          <div className="absolute inset-x-0 top-full mt-2 bg-white border rounded p-2 text-red-500">
            {error}
          </div>
        )}
        {isDropdownOpen && results.length > 0 && (
          <ul className="absolute inset-x-0 top-full mt-2 bg-white border rounded-lg border-[#94A3B8] max-h-60 overflow-y-auto divide-y divide-[#94A3B8]">
            {results.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isSelected={selected.some(
                  (selectedChar) => selectedChar.id === char.id
                )}
                onSelect={handleSelect}
                highlightQuery={highlightQuery}
                query={query}
              />
            ))}
          </ul>
        )}
        {isDropdownOpen && results.length === 0 && (
          <div className="absolute inset-x-0 top-full mt-2 bg-white border rounded p-2">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
