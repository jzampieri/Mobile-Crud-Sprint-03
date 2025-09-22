import axios from 'axios';
import { Item } from '../types/Item';

const api = axios.create({
  baseURL: 'https://68d0a8a2e6c0cbeb39a22038.mockapi.io', 
  timeout: 10000,
});

export async function listItems(): Promise<Item[]> {
  const { data } = await api.get<Item[]>('/items');
  return data.sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1));
}
export async function getItem(id: string): Promise<Item> {
  const { data } = await api.get<Item>(`/items/${id}`);
  return data;
}
export async function createItem(payload: Omit<Item,'id'|'createdAt'>): Promise<Item> {
  const { data } = await api.post<Item>('/items', { ...payload, createdAt: new Date().toISOString() });
  return data;
}
export async function updateItem(id: string, payload: Partial<Item>): Promise<Item> {
  const { data } = await api.put<Item>(`/items/${id}`, payload);
  return data;
}
export async function deleteItem(id: string): Promise<void> {
  await api.delete(`/items/${id}`);
}
