import client from "./client";

export const getActivePeers = async () => {
  try {
    const { data } = await client.get('/api/customer/active_users');
    return { peers: data };
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};