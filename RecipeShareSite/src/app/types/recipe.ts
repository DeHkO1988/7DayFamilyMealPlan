export interface Recipe {
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
    likes:[],
    owner: string,
    error: string,
}