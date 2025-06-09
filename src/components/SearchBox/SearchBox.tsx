import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ search, onSearch }) => {
  return (
    <input
      type="text"
      className={css.input}
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search notes..."
    />
  );
};

export default SearchBox;
