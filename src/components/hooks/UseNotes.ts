import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import type { FetchNotesResponse } from '../../types/note';

interface UseNotesParams {
  search: string;
  page: number;
}

export const useNotes = ({ search, page }: UseNotesParams) => {
  return useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page }),
  });
};
