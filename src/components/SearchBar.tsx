
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types/doctor';
import { getSuggestedDoctors } from '../utils/filterUtils';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (searchTerm: string) => void;
  onSuggestionSelect: (doctorName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, onSearch, onSuggestionSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const suggestedDoctors = getSuggestedDoctors(doctors, searchTerm);
    setSuggestions(suggestedDoctors);
    setShowSuggestions(suggestedDoctors.length > 0);
  }, [searchTerm, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSuggestionClick = (doctorName: string) => {
    setSearchTerm(doctorName);
    onSuggestionSelect(doctorName);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative">
        <input
          ref={inputRef}
          data-testid="autocomplete-input"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full h-12 pl-4 pr-10 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-doctorBlue"
        />
        <div className="absolute right-3 top-3 text-gray-400">
          <Search size={24} />
        </div>
      </div>

      {showSuggestions && (
        <div 
          ref={suggestionRef} 
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              <div className="font-semibold">{doctor.name}</div>
              <div className="text-sm text-gray-500">{doctor.specialty.join(', ')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
