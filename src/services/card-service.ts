import _ from "underscore";
import {ICardInput } from "../@types/@types";
import Card from "../db/models/card-model";
import { Logger } from "../logs/logger";

const generateBizNumber = async () => {
  //generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Card.findOne({ bizNumber: r });
    if (!dbRes) {
      return r;
    }
  }
};

export const cardService = {
  createCard: async (data: ICardInput, userId: string) => {
    //userId is extracted from the JWT
    const card = new Card(data);
    //assign user id to the card:
    card.userId = userId;
    //generate biz number to the card:
    card.bizNumber = await generateBizNumber();

    Logger.log(card.bizNumber);

    return card.save();
  },

  getCards: async () => Card.find(),

  getCard: async (id:string) => Card.findById(id),
  getCardByUserId: async (userId:string) => Card.find({userId: userId}),
  
};
