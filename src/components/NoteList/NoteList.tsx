import React, { useEffect } from 'react';
import { useNotes } from '../hooks/UseNotes';
import { useDeleteNote } from '../hooks/useDeleteNote';
import css from './NoteList.module.css';

interface NoteListProps {
  search: string;
  currentPage: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const NoteList: React.FC<NoteListProps> = ({ search, currentPage, setTotalPages }) => {
  const { data, isLoading, isError } = useNotes({ search, page: currentPage });
  const { mutate: deleteNote } = useDeleteNote();

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data, setTotalPages]);

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;
  if (!data?.notes?.length) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {data.notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.deleteButton}
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
