
import { Resolver, Query, Arg} from "type-graphql";
import { Questions } from "../entity/questions";
import {getRepository, createConnection, getConnection} from "typeorm";

@Resolver()
export class QuestionResolver {
  @Query(() => String)
  hello() {
    return "world";
  }

  @Query(() => [Questions])
  async questions() {
    const QuestionsRepository = await getConnection().getRepository(Questions); 
    return await QuestionsRepository.find();
  }

  @Query(() => Questions)
  async question(@Arg("id") id: number) {  
    const QuestionsRepository = await getConnection().getRepository(Questions);
    return await QuestionsRepository.findOne({ where: { id } });
  }
}