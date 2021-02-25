import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
  
  async create(req: Request, resp: Response){
    const {name, email} = req.body;
    
    const usersRepository = getCustomRepository(UsersRepository);
    
    const userAlreadyExists = await usersRepository.findOne({email});
    
    if(userAlreadyExists){
      return resp.status(400).json({
        error: "user already exists!"
      });
    }
    
    const user = usersRepository.create({
      name, email
    });
    
    await usersRepository.save(user);
    
    return resp.json(user);
  }
  
}

export { UserController };
