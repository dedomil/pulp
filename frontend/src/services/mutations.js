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
    retry: false,
  });
}

export function useUpdatePulpMutation() {
  return useMutation({
    mutationKey: ["updatePulp"],
    mutationFn: async (data) => {
      return (
        await axios.patch(API_URL, data, {
          headers: { "Content-Type": "application/json" },
        })
      ).data;
    },
    retry: false,
  });
}

export function useDeletePulpMutation() {
  return useMutation({
    mutationKey: ["deletePulp"],
    mutationFn: async (data) => {
      return (
        await axios.delete(API_URL, {
          headers: { "Content-Type": "application/json" },
          data,
        })
      ).data;
    },
    retry: false,
  });
}
