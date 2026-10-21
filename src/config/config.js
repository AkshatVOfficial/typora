const config = {
  endpoint: import.meta.env.VITE_APPWRITE_URL,
  projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  tableID: import.meta.env.VITE_APPWRITE_TABLE_ID,
  userTableID: import.meta.env.VITE_APPWRITE_USER_TABLE_ID,
  bucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export default config;
