import { useCallback, useEffect, useState } from 'react';
import { Item } from '../types/Item';
import * as API from '../api';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const data = await API.listItems();
      setItems(data);
    } catch (e:any) {
      setError('Falha ao carregar itens. Verifique conexão/servidor.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = async (payload: Omit<Item,'id'|'createdAt'>) => {
    try {
      setError(null);
      const created = await API.createItem(payload);
      setItems(prev => [created, ...prev]);
      return created;
    } catch { setError('Não foi possível criar.'); throw new Error(); }
  };
  const update = async (id: string, payload: Partial<Item>) => {
    try {
      setError(null);
      const upd = await API.updateItem(id, payload);
      setItems(prev => prev.map(i => i.id === id ? upd : i));
      return upd;
    } catch { setError('Não foi possível atualizar.'); throw new Error(); }
  };
  const remove = async (id: string) => {
    try {
      setError(null);
      await API.deleteItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch { setError('Não foi possível remover.'); throw new Error(); }
  };

  return { items, loading, error, fetchAll, create, update, remove };
}
