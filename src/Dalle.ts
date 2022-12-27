import axios from "axios";
import { DalleError } from "./DalleError";

interface DalleOptions {
  apiKey?: string;
}

interface generation {
  image_path: string;
}

interface generationType {
  id: string;
  object: string;
  created: number;
  generation_type: string;
  generation: generation[];
  task_id: string;
  prompt_id: string;
  is_public: boolean;
}

const error = new DalleError(`> Dall AI (Coded By Kabir Singh)`);

export class Dalle {
  private apiKey: any;
  private url: string;
  constructor({ apiKey }: DalleOptions) {
    this.apiKey = apiKey;
    this.url = `https://labs.openai.com/api/labs`;
  }

  async generate(query: string, amount: number = 4): Promise<generationType[]> {
    // code
    const body = {
      task_type: "text2im",
      prompt: { caption: query, batch_size: amount },
    };
    return new Promise(async (resolve, reject) => {
      const response = await axios.post(`${this.url}/tasks`, body, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });
      if (response.statusText !== "OK") {
        error.send(response);
        return reject("Unauthorised. Invalid unique session ID.");
      }
      const { data } = response;
      const taskId: string = data.id;
      const refreshIntervalId = setInterval(async () => {
        const response = await axios.get(`${this.url}/${taskId}`, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip,deflate,compress",
          },
        });
        if (response.statusText !== "OK") {
          error.send(response);
          return reject(
            "Dall-e 2 couldn't generate images based upon your caption."
          );
        }
        const { data } = response;
        if (data.status === "rejected") {
          clearInterval(refreshIntervalId);
          resolve(data.status_information);
        } else if (data.status === "succeeded") {
          const generations = data.generations.data;
          clearInterval(refreshIntervalId);
          resolve(generations);
        }
      }, 3000);
    });
  }

  async getTask(taskId: string) {
    const res = await axios
      .get(`${this.url}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })
      .catch((e) => error.send(e));
    return res?.data;
  }

  async getList(limit: number) {
    const res = await axios
      .get(`${this.url}/tasks?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })
      .catch((e) => error.send(e));
    return res?.data;
  }

  async getCredits() {
    const res = await axios
      .get(`${this.url}/billing/credit_summary`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })
      .catch((e) => error.send(e));
    return res?.data;
  }
}
