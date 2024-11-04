import { AxiosResponse } from "axios";
import { PollData } from "../../widgets/Poll";
import socket from "./socket";
import axiosInstance from "./intersertor";

export class Api {
  static getAllPolls(): Promise<AxiosResponse<PollData[], any>> {
    return axiosInstance.get("/polls");
  }

  static createPoll(
    poll: Omit<PollData, "id">
  ): Promise<AxiosResponse<PollData, any>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/polls", poll)
        .then((response) => {
          socket.emit("createPoll", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static voteInPoll(
    pollId: number,
    answerIndex: number
  ): Promise<AxiosResponse<PollData, any>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/polls/${pollId}/vote`, { answerIndex })
        .then((response) => {
          socket.emit("voteInPoll", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
