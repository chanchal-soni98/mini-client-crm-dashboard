import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../api/axiosInstance";

export const useClients = () => {
  const queryClient = useQueryClient();

  const getClients = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axiosInstance.get("/clients");
      return res.data;
    },
  });

  const addClient = useMutation({
    mutationFn: (newClient) => axiosInstance.post("/clients", newClient),
    onMutate: async (newClient) => {
      await queryClient.cancelQueries({ queryKey: ["clients"] });

      const previousClients = queryClient.getQueryData(["clients"]);

      const optimisticClient = {
        ...newClient,
        id: Date.now(), 
      };

      queryClient.setQueryData(["clients"], (old = []) => [optimisticClient, ...old]);

      return { previousClients };
    },
    onError: (err, newClient, context) => {
      queryClient.setQueryData(["clients"], context.previousClients);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const updateClient = useMutation({
    mutationFn: ({ id, data }) => axiosInstance.put(`/clients/${id}`, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["clients"] });

      const previousClients = queryClient.getQueryData(["clients"]);

      queryClient.setQueryData(["clients"], (old = []) =>
        old.map((client) => (client.id === id ? { ...client, ...data } : client))
      );

      return { previousClients };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["clients"], context.previousClients);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const deleteClient = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/clients/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["clients"] });

      const previousClients = queryClient.getQueryData(["clients"]);

      queryClient.setQueryData(["clients"], (old = []) =>
        old.filter((client) => client.id !== id)
      );

      return { previousClients };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["clients"], context.previousClients);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  return { getClients, addClient, updateClient, deleteClient };
};
