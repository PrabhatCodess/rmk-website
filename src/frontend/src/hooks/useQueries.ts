import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GuestReview, Room } from "../backend.d";
import { useActor } from "./useActor";

export function useGetRooms() {
  const { actor, isFetching } = useActor();
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRooms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllGuestReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<GuestReview[]>({
    queryKey: ["guestReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGuestReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBookingInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      email: string;
      checkIn: string;
      checkOut: string;
      numberOfGuests: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitBookingInquiry(
        params.name,
        params.email,
        params.checkIn,
        params.checkOut,
        params.numberOfGuests,
        params.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingInquiries"] });
    },
  });
}
