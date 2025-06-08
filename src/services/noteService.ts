import axios from 'axios';
import { Note, FetchNotesResponse } from '../types/note';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesParams {
  page: number;
  search: string;
}

export const fetchNotes = async ({ page, search }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = {
    page: page < 1 ? 1 : page,
    perPage: 12,
    ...(search.trim() && { search }),
  };

  const response = await instance.get('/notes', { params });
  return response.data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const response = await instance.post('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const response = await instance.delete(`/notes/${id}`);
  return response.data;
};
