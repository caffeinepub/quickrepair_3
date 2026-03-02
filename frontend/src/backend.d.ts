import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    id: bigint;
    startingPrice: bigint;
    icon: string;
    name: string;
    description: string;
}
export interface MechanicRegistration {
    age: bigint;
    serviceType: string;
    name: string;
    email: string;
    experience: string;
    preferredArea: string;
    address: string;
    timestamp: bigint;
    phone: string;
    whyJoin: string;
}
export interface Booking {
    bookingId: bigint;
    user: Principal;
    mobileNumber: string;
    address: string;
    bookingTime: bigint;
    serviceId: bigint;
}
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
    addBooking(serviceId: bigint, address: string, mobileNumber: string, bookingTime: bigint): Promise<void>;
    addFeedback(name: string, stars: bigint, message: string): Promise<void>;
    addService(name: string, description: string, icon: string, startingPrice: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBooking(bookingId: bigint): Promise<void>;
    deleteFeedback(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    deleteUser(p: Principal): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllFeedback(): Promise<Array<[bigint, string, bigint, string, bigint]>>;
    getAllServices(): Promise<Array<Service>>;
    getAverageRating(): Promise<number>;
    getBookingsForCaller(): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeedbackCount(): Promise<bigint>;
    getMechanicRegistrations(): Promise<Array<MechanicRegistration>>;
    getMyProfile(): Promise<UserProfile | null>;
    getService(id: bigint): Promise<Service | null>;
    getStars(): Promise<Array<bigint>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUsers(): Promise<Array<[Principal, UserProfile]>>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(name: string, phone: string, area: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitMechanicRegistration(name: string, phone: string, email: string, serviceType: string, experience: string, address: string, age: bigint, preferredArea: string, whyJoin: string): Promise<void>;
    updateBooking(bookingId: bigint, serviceId: bigint, address: string, mobileNumber: string, bookingTime: bigint): Promise<void>;
    updateService(id: bigint, name: string, description: string, icon: string, startingPrice: bigint): Promise<void>;
}
