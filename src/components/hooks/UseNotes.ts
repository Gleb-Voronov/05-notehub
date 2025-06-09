import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { FetchNotesResponse } from '../../types/note';

export const useNotes = (search: string, page: number) => {
  return useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page),
    
    meta: {
      keepPreviousData: true,
    },
  });
};
