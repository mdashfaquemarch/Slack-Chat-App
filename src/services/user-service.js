import UserRepository from "../repositories/user-repository.js";


const userRepo = new UserRepository()

async function signUpService(data) {
    try {
        const newUser = await userRepo.create(data);
        return newUser;
    } catch (error) {
        console.log("user service error ", error);
        throw error;
    }
}


export {
    signUpService
}