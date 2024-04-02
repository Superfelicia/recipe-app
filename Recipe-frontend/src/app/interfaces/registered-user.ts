import { User } from "./user";

export interface RegisteredUser {
    user: User | undefined;
    registeredState: boolean;
}
