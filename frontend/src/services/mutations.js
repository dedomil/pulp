import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export function useCreatePulpMutation() {
  return useMutation({
    mutationKey: ["createPulp"],
    mutationFn: async (data) => {
      return (
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "application/json" },
        })
      ).data;
    },
  });
}
