export interface MenuItem {
    title: string;
    icon: string;
    route: string;
}

export interface NavItem {
    label: string;
    icon: string;
    expanded?: boolean;
    children?: NavItem[];
}

export interface LoggedInUsers {
    "u_id": string,
    "u_name": string,
    "p_hash": string,
    "p_salt": string,
    "hash_algorithm_id": string,
    "date": Date,
}

export interface Geolocation {
    latitude: number | undefined;
    longitude: number | undefined; 
    error: string | undefined;
}