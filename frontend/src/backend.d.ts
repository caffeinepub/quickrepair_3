import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    area: string;
    signupTime: bigint;
    name: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFeedback(name: string, stars: bigint, message: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteFeedback(id: bigint): Promise<void>;
    deleteUser(p: Principal): Promise<void>;
    getAllFeedback(): Promise<Array<[bigint, string, bigint, string, bigint]>>;
    getAverageRating(): Promise<number>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeedbackCount(): Promise<bigint>;
    getMyProfile(): Promise<UserProfile | null>;
    getStars(): Promise<Array<bigint>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUsers(): Promise<Array<[Principal, UserProfile]>>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(name: string, phone: string, area: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
