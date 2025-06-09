import axios from 'axios';
import { Note, FetchNotesResponse } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchNotes = async (
  search: string,
  page: number
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  const { data } = await axios.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};
