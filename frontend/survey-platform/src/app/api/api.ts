import { AxiosResponse } from "axios";
import { PollData } from "../../widgets/Poll";
import axiosInstance from "./intersertor";

export class Api {
  static getAllPolls(): Promise<AxiosResponse<PollData[], any>> {
    return axiosInstance.get("/polls");
  }

  static createPoll(poll: Omit<PollData, "id">) {
    return axiosInstance.post("/polls", poll);
  }

  static voteInPoll(pollId: number, answerIndex: number) {
    return axiosInstance.post(`/polls/${pollId}/vote`, { answerIndex });
  }
}
