import { User } from "./user";

export interface Recipe {
    _id: string,
    title: string,
    readyIn: string,
    ingredients: string,
    serves: string,
    image: string,
    description: string,
    // likes: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    // }],
    ownerUsername: string,
    likes: [],
    owner: User,
    error: string,
}