
import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const getArrayParam = (key: string): string[] => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value.split(',');
  };

  const setParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const setArrayParam = (key: string, values: string[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (values.length === 0) {
      newParams.delete(key);
    } else {
      newParams.set(key, values.join(','));
    }
    setSearchParams(newParams);
  };

  return {
    getParam,
    getArrayParam,
    setParam,
    setArrayParam,
  };
}
