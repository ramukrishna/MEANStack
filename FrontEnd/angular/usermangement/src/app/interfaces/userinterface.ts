export interface MenuItem { 
    title: string; 
    icon: string; 
    route: string; 
}

export interface LoggedInUsers{
        "u_id": string,
        "u_name": string,
        "p_hash": string,
        "p_salt": string,
        "hash_algorithm_id": string,
        "date": Date,
}