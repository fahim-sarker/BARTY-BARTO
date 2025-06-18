import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import useAxios from "./UseAxios";

interface FetchDataResult<T> {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
}


function useFetchData<T>(
  url: string,
  token: string | null = null
): FetchDataResult<T> {
  const axiosInstance = useAxios(token);

  const fetchData = async (): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  };

  const { data, error, isLoading }: UseQueryResult<T, unknown> = useQuery<T>({
    queryKey: [url],
    queryFn: fetchData,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

export default useFetchData;
