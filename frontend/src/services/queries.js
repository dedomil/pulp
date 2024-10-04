import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useGetPulpQuery(id) {
  return useQuery({
    queryKey: ["getPulp"],
    queryFn: async () => {
      return (await axios.get(`${API_URL}/${id}`)).data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
}
