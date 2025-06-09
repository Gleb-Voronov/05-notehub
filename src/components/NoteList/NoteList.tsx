import { Note } from '../../types/note';
import { useDeleteNote } from '..//hooks/useDeleteNote';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const { mutate: deleteNote } = useDeleteNote();

  if (!notes.length) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
