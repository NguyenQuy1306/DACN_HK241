import axios from "axios";
const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
});

export const getRestaurants = () => API.get(`api/restaurants`);
export const getRestaurantsInMaps = async (params) => {
  try {
    const response = await API.get(`api/restaurants/list-in-boundary`, {
      params,
    });
    return response.data; // Ensure this matches your ApiResponse structure
  } catch (error) {
    throw error.response.data; // Adjust to throw the error response for handling in Redux
  }
};

// export const getRecords = () => API.get("api/records");
// export const getRelays = () => API.get("api/relay");
// export const controlRelays = (data) => API.post("api/relay", data);

// export const getRecordsWithZone = () => API.get("api/recordsByZone");
// export const getThreshold = () => API.get("/threshold");
// export const updateThreshold = (data) => API.put("/threshold", data);
// export const getNotify = () => API.get("/notify");
// export const setView = (data) => API.put("/notify/setView", data);
// export const getAllDeviceS = () => API.get("/devices");
// export const getRecordsDataWithZone = (time) =>
//   API.get(`api/recordsWithZone/${time}`);
// export const getRecordsData = (time) => API.get(`api/records/${time}`);
// export const getAvgValues = () => API.get("api/records/average");
// export const getAvgValuesWithZone = () =>
//   API.get("api/records/averageWithZone");
// export const getUserActivity = (time) => API.get(`/useract/${time}`);
// export const getLight = (page) => API.get(`/getLight/${page}`);
// export const getWater = (page) => API.get(`/getWater/${page}`);
// export const setSchedule = (schedule) => API.post("/sendSched", schedule);
// export const deleteSched = (ids) => API.post("/deleteSched", ids);
// export const modifySched = (infor) => API.post("/modifySched", infor);
// // export const authenticate = (data) => API.post("/login", data);
// export const getRecordsByTime = (time) => API.get(`api/timerecords/${time}`);

// export const register = (data) => API.post("/api/register", data);
// export const authenticate = (data) => API.post("/api/login", data);

// export const getListZones = (owner_id) =>
//   API.get("/api/listzones", { params: { owner_id } });
// export const getALlListSchedulers = (owner_id) =>
//   API.get("/api/listALlSchedulers", { params: { owner_id } });
// export const getFilterListSchedulers = (
//   owner_id,
//   initialZoneName,
//   initialSchedulerType
// ) =>
//   API.get("/api/listFilterSchedulers", {
//     params: { owner_id, initialZoneName, initialSchedulerType },
//   });
// export const getListDevicesFromZone = (owner_id, zonename) =>
//   API.get("/api/listDeviceFromZone", {
//     params: { owner_id, zonename },
//   });
