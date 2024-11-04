import { AxiosResponse } from "axios";

import axiosInstance from "./intersertor";
import { PollData } from "../../widgets/Poll";

export class Api {
  static getAllPolls(): Promise<AxiosResponse<PollData[], any>> {
    return axiosInstance.get("/polls");
  }

  static createPoll(
    poll: Omit<PollData, "id">
  ): Promise<AxiosResponse<PollData, any>> {
    return axiosInstance.post("/polls", poll);
  }

  static voteInPoll(
    pollId: number,
    answerIndex: number
  ): Promise<AxiosResponse<PollData, any>> {
    return axiosInstance.post(`/polls/${pollId}/vote`, { answerIndex });
  }
}
