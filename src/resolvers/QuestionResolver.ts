import { Arg, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Question } from '../entity/Question';

@Resolver()
export class QuestionResolver {
  @Query(() => String)
  hello() {
    return "world";
  }

  @Query(() => [Question])
  async questions() {
    const QuestionsRepository = await getConnection().getRepository(Question);
    return await QuestionsRepository.find();
  }

  @Query(() => Question)
  async question(@Arg("id") id: number) {  
    const QuestionsRepository = await getConnection().getRepository(Question);
    return await QuestionsRepository.findOne({ where: { id } });
  }
}
