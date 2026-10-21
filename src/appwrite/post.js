import {
  Client,
  Account,
  ID,
  TablesDB,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";
import config from "../config/config";

const buildPermissions = (userID, status) => [
  status ? Permission.read(Role.any()) : Permission.read(Role.user(userID)),
  Permission.update(Role.user(userID)),
  Permission.delete(Role.user(userID)),
];

export class Post {
  client = new Client();
  account;
  tablesDB;
  bucket;

  constructor() {
    this.client.setProject(config.projectID).setEndpoint(config.endpoint);
    this.account = new Account(this.client);
    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async getCurrentUserID() {
    const user = await this.account.get();
    return user.$id;
  }

  async createPost({
    title,
    slug,
    description,
    content,
    featuredImage,
    status,
  }) {
    try {
      const userID = await this.getCurrentUserID();

      return await this.tablesDB.createRow({
        databaseId: config.databaseID,
        tableId: config.tableID,
        rowId: ID.unique(),
        data: {
          title,
          slug,
          description,
          content,
          featuredImage,
          status,
          userID,
        },
        permissions: buildPermissions(userID, status),
      });
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(
    rowId,
    { title, slug, description, content, featuredImage, status },
  ) {
    try {
      const userID = await this.getCurrentUserID();

      return await this.tablesDB.updateRow({
        databaseId: config.databaseID,
        tableId: config.tableID,
        rowId,
        data: {
          title,
          slug,
          description,
          content,
          featuredImage,
          status,
        },
        permissions: buildPermissions(userID, status),
      });
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(rowId) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: config.databaseID,
        tableId: config.tableID,
        rowId,
      });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      throw error;
    }
  }

  async getPost(rowId) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.databaseID,
        tableId: config.tableID,
        rowId,
      });
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      throw error;
    }
  }

  async getPosts({ limit = 25, offset = 0 } = {}) {
    try {
      return await this.tablesDB.listRows({
        databaseId: config.databaseID,
        tableId: config.tableID,
        queries: [
          Query.equal("status", true),
          Query.limit(limit),
          Query.offset(offset),
        ],
      });
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      throw error;
    }
  }

  async getUserPosts(userID, { limit = 25, offset = 0 } = {}) {
    try {
      return await this.tablesDB.listRows({
        databaseId: config.databaseID,
        tableId: config.tableID,
        queries: [
          Query.equal("userID", userID),
          Query.limit(limit),
          Query.offset(offset),
        ],
      });
    } catch (error) {
      console.error("getUserPosts error:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      const userID = await this.getCurrentUserID();

      return await this.bucket.createFile({
        bucketId: config.bucketID,
        fileId: ID.unique(),
        file,
        permissions: [
          Permission.read(Role.any()),
          Permission.update(Role.user(userID)),
          Permission.delete(Role.user(userID)),
        ],
      });
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }

  async getFile(fileId) {
    try {
      return await this.bucket.getFile({
        bucketId: config.bucketID,
        fileId,
      });
    } catch (error) {
      console.error("Appwrite service :: getFile :: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile({
        bucketId: config.bucketID,
        fileId,
      });
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      throw error;
    }
  }

  async fileView(fileId) {
    try {
      return this.bucket.getFileView({
        bucketId: config.bucketID,
        fileId,
      });
    } catch (error) {
      console.error("Appwrite service :: fileView :: error", error);
      throw error;
    }
  }

  fileDownload(fileId) {
    try {
      return this.bucket.getFileDownload({
        bucketId: config.bucketID,
        fileId,
      });
    } catch (error) {
      console.error("Appwrite service :: fileDownload :: error", error);
      throw error;
    }
  }

  previewFile(fileId) {
    try {
      return this.bucket.getFileView({
        bucketId: config.bucketID,
        fileId,
      });
    } catch (error) {
      console.error("Appwrite service :: previewFile :: error", error);
      throw error;
    }
  }
}

const postService = new Post();

export default postService;
