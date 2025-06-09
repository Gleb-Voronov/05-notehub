import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNotes } from '../hooks/UseNotes';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteForm from '../../components/NoteForm/NoteForm';
import NoteModal from '../../components/NoteModal/NoteModal';
import Pagination from '../../components/Pagination/Pagination';


const App = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useNotes(debouncedSearch, currentPage);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Add Note</button>
      <SearchBox search={search} onSearch={handleSearch} />

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Failed to load notes.</p>}

      {data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </NoteModal>
      )}
    </div>
  );
};

export default App;
