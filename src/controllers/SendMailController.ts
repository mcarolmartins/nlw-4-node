import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from 'path';
import { SurveysUsersRepository } from "../repositories/SurverysUsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";


class SendMailController {
  async execute(req: Request, res: Response){
    const {email, survey_id} = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({email});

    if(!user){
      return res.status(400).json({
        error: "User does not exists",
      });
    }

    const survey = await surveysRepository.findOne({id: survey_id});

    if(!survey){
      return res.status(400).json({
        error: "Survey does not exists",
      });
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadExists = await surveysUsersRepository.findOne({
      where: [{user_id: user.id}, {value : null}],
      relations: ["user", "survey"]
    });

    if(surveyUserAlreadExists){
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return res.json(surveyUserAlreadExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveysUsersRepository.save(surveyUser);

 

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.json(surveyUser);
  }
}

export {SendMailController}