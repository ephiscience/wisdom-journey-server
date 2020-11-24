// src/resolvers/BookResolver.ts

import { Resolver, Query } from "type-graphql";
import { Questions } from "../entity/Questions";

@Resolver()
export class QuestionResolver {
  @Query(() => String)
  hello() {
    return "world";
  };

  @Query(() => [Questions])
  questions() {
    return Questions.find();
  };

  @Query(() => Questions)
  question(@Arg("id") id: ID) {
    return Questions.findOne({ where: { id } });
  };
}