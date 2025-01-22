export type User = {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    address:Address;
}


export type Address = {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}