import { IMessage } from "../entity/db/model/message";
import logger from "../utility/logger";

class MessageRepository{
  async create(): Promise<IMessage>{
    try {
      
    } catch (e) {
      logger.error("An error occurred in repository")
      throw e;
    }
  }
}

export default new MessageRepository();