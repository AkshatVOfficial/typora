import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class Auth {
  client = new Client();
  account;

  constructor() {
    this.client.setProject(config.projectID).setEndpoint(config.endpoint);
    this.account = new Account(this.client);
  }

  async signup({ name, email, password }) {
    try {
      await this.account.create({
        userId: ID.unique(),
        name,
        email,
        password,
      });
    } catch (error) {
      console.error("Appwrite service :: signup :: create error", error);
      throw error;
    }

    return this.login({ email, password });
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.error("Appwrite service :: login :: error", error);
      throw error;
    }
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401) return null;
      console.error("Appwrite service :: getUser :: error", error);
      throw error;
    }
  }

  async updateName(name) {
    try {
      return await this.account.updateName({ name });
    } catch (error) {
      console.error("Appwrite service :: updateName :: error", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.error("Appwrite service :: logout :: error", error);
      throw error;
    }
  }

  async sendVerification(url = `${window.location.origin}/verify`) {
    try {
      return await this.account.createVerification({ url });
    } catch (error) {
      console.error("Appwrite service :: sendVerification :: error", error);
      throw error;
    }
  }

  async confirmVerification({ userId, secret }) {
    try {
      return await this.account.updateVerification({ userId, secret });
    } catch (error) {
      console.error("Appwrite service :: confirmVerification :: error", error);
      throw error;
    }
  }
}

const authService = new Auth();
export default authService;
