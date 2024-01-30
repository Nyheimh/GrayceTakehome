import axios from "axios";

export async function fetchMemberData() {
  try {
    const response = await axios.get("../json/members.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching members data:", error);
    return null;
  }
}

export async function fetchCarePartnerData() {
  try {
    const response = await axios.get("../json/care_partners.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching care partners data:", error);
    return null;
  }
}
