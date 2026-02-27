import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useEffect, useState } from 'react';
import type { UserProfile } from '../backend';
import type { Principal } from '@dfinity/principal';

export interface FeedbackItem {
  id: bigint;
  name: string;
  stars: number;
  message: string;
  timestamp: bigint;
}

// Delay feedback queries until after initial page paint for better performance
function useDelayedReady(delayMs = 600) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);
  return ready;
}

export function useGetAllFeedback() {
  const { actor, isFetching } = useActor();
  const delayed = useDelayedReady(600);

  return useQuery<FeedbackItem[]>({
    queryKey: ['feedback'],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllFeedback();
      return raw.map(([id, name, stars, message, timestamp]) => ({
        id,
        name,
        stars: Number(stars),
        message,
        timestamp,
      }));
    },
    enabled: !!actor && !isFetching && delayed,
  });
}

export function useGetAverageRating() {
  const { actor, isFetching } = useActor();
  const delayed = useDelayedReady(600);

  return useQuery<number>({
    queryKey: ['averageRating'],
    queryFn: async () => {
      if (!actor) return 0;
      return actor.getAverageRating();
    },
    enabled: !!actor && !isFetching && delayed,
  });
}

export function useGetFeedbackCount() {
  const { actor, isFetching } = useActor();
  const delayed = useDelayedReady(600);

  return useQuery<bigint>({
    queryKey: ['feedbackCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getFeedbackCount();
    },
    enabled: !!actor && !isFetching && delayed,
  });
}

export function useAddFeedback() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      stars,
      message,
    }: {
      name: string;
      stars: number;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addFeedback(name, BigInt(stars), message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      queryClient.invalidateQueries({ queryKey: ['averageRating'] });
      queryClient.invalidateQueries({ queryKey: ['feedbackCount'] });
    },
  });
}

// ─── User Profile Hooks ───────────────────────────────────────────────────────

export function useMyProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useRegisterUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      phone,
      area,
    }: {
      name: string;
      phone: string;
      area: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.registerUser(name, phone, area);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Admin Hooks ──────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useAllUsers() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[Principal, UserProfile]>>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUsers();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useAllFeedbackAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<FeedbackItem[]>({
    queryKey: ['allFeedbackAdmin'],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllFeedback();
      return raw.map(([id, name, stars, message, timestamp]) => ({
        id,
        name,
        stars: Number(stars),
        message,
        timestamp,
      }));
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useDeleteUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteUser(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
}

export function useDeleteFeedback() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteFeedback(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      queryClient.invalidateQueries({ queryKey: ['allFeedbackAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['averageRating'] });
      queryClient.invalidateQueries({ queryKey: ['feedbackCount'] });
    },
  });
}
