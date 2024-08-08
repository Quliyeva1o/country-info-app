import axios from "axios";

export async function getUrl(url:string) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error;
  }
}



