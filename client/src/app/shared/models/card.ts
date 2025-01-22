// export type cardDetail =  {
//     name: string
//     email: string
//     phoneNo: string
//     nickName: string
//     address: string
//     currentOrg: string
//     ig: string
//     fb: string
//     whatsApp: string
//     linkedIn: string
//     age: number
//     gender: string
//     userId: string
//     pictureUrl: string
//     id: number
// }

export type cardDetail = {
    userId: string
    name: string
    title: string
    email: string
    phone: string
    organization: string
    weblink1: string
    weblink2: string
    weblink3: string
    weblink4: string
    address: string
    city: string
    state: string
    zipCode: string
    pictureUrl: string
    id: number
    photo : photo
}

export type photo = {
    id:number
    publicId :string
    url: string
    isMain : string
    userId :string
}
