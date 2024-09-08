import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getListzoness = createAsyncThunk(
  "/listzones",
  async (owner_id, { rejectWithValue }) => {
    try {
      console.log("im call uuuuuu owner_id in listzoneeeee", owner_id);
      const response = await api.getListZones(owner_id);
      console.log("nguyenquy");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getALlListSchedulers = createAsyncThunk(
  "/listALlSchedulers",
  async (owner_id, { rejectWithValue }) => {
    try {
      const response = await api.getALlListSchedulers(owner_id);
      console.log("response.data in getALlListSchedulers", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getListSchedulers = createAsyncThunk(
  "/listFilterSchedulers",
  async (
    { owner_id, initialZoneName, initialSchedulerType },
    { rejectWithValue }
  ) => {
    try {
      console.log("im call uuuuuu owner_id", owner_id);
      console.log("im call uuuuuu initialZoneName", initialZoneName);
      console.log("im call uuuuuu initialSchedulerType", initialSchedulerType);
      const response = await api.getFilterListSchedulers(
        owner_id,
        initialZoneName,
        initialSchedulerType
      );
      console.log("response.data in getALlListSchedulers", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getListDevicesFromZone = createAsyncThunk(
  "/listDeviceFromZone",
  async ({ owner_id, zonename }, { rejectWithValue }) => {
    try {
      const response = await api.getListDevicesFromZone(owner_id, zonename);
      console.log("response.data in getALlListSchedulers", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createConstraintSchedulerr = createAsyncThunk(
  "/createConstraintScheduler",
  async (
    {
      scheduler_name,
      owner_id,
      schedulertype,
      zonename,
      device,
      level,
      temp_on,
      humid_on,
      lux_on,
      temp_off,
      humid_off,
      lux_off,
      interval,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createConstraintScheduler(
        scheduler_name,
        owner_id,
        schedulertype,
        zonename,
        device,
        level,
        temp_on,
        humid_on,
        lux_on,
        temp_off,
        humid_off,
        lux_off,
        interval
      );
      console.log("create Constraint Scheduler", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createCronjobScheduler = createAsyncThunk(
  "/createCronjobScheduler",
  async (
    {
      scheduler_name,
      owner_id,
      schedulertype,
      zonename,
      device,
      level,
      time_interval,
      time_period,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createCronjobScheduler(
        scheduler_name,
        owner_id,
        schedulertype,
        zonename,
        device,
        level,
        time_interval,
        time_period
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteScheduler = createAsyncThunk(
  "/deleteScheduler",
  async ({ owner_id, id_scheduler }, { rejectWithValue }) => {
    try {
      const response = await api.deleteScheduler(owner_id, id_scheduler);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const schedulerSlice = createSlice({
  name: "schedule",
  initialState: {
    zone: [],
    scheduler: [],
    filterscheduler: [],
    listdevicefromzone: [],
    error: "",
    loading: false,
    creatCheck: false,
    creatCheck2: false,
    checkDelete: false,
  },
  extraReducers: {
    [getListzoness.pending]: (state, action) => {
      console.log("Update");
      state.loading = true;
    },
    [getListzoness.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Update2");
      state.zone = action.payload;
      console.log("state.zone", state.zone);
    },
    [getListzoness.rejected]: (state, action) => {
      state.loading = false;
      console.log("Update3");
      state.error = action.payload;
    },
    [getALlListSchedulers.pending]: (state, action) => {
      console.log("Update4");
      state.loading = true;
    },
    [getALlListSchedulers.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Update5");
      state.filterscheduler = action.payload;
      console.log("state.scheduler", state.scheduler);
    },
    [getALlListSchedulers.rejected]: (state, action) => {
      state.loading = false;
      console.log("Update6");
      state.error = action.payload;
    },

    [getListSchedulers.pending]: (state, action) => {
      console.log("Update7");
      state.loading = true;
    },
    [getListSchedulers.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Update8");
      state.filterscheduler = action.payload;
      console.log("state.filterscheduler", state.filterscheduler);
    },
    [getListSchedulers.rejected]: (state, action) => {
      state.loading = false;
      console.log("Update9");
      state.error = action.payload;
    },
    [getListDevicesFromZone.pending]: (state, action) => {
      console.log("Update10");
      state.loading = true;
    },
    [getListDevicesFromZone.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Update11");
      state.listdevicefromzone = action.payload;
      console.log("state.filterscheduler", state.filterscheduler);
    },
    [getListDevicesFromZone.rejected]: (state, action) => {
      state.loading = false;
      console.log("Update12");
      state.error = action.payload;
    },

    [createConstraintSchedulerr.pending]: (state, action) => {
      console.log("Update13");
      state.loading = true;
    },
    [createConstraintSchedulerr.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Update14");
      state.creatCheck = true;
    },
    [createConstraintSchedulerr.rejected]: (state, action) => {
      state.loading = false;
      console.log("Update15");
      state.creatCheck = false;
    },

    [createCronjobScheduler.pending]: (state, action) => {
      console.log("Update16");
      state.loading = true;
    },
    [createCronjobScheduler.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Update17");
      state.creatCheck2 = true;
    },
    [createCronjobScheduler.rejected]: (state, action) => {
      state.loading = false;
      console.log("Update18");
      state.creatCheck2 = false;
    },

    [deleteScheduler.pending]: (state, action) => {
      console.log("Update19");
      state.loading = true;
    },
    [deleteScheduler.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Update20");
      state.checkDelete = true;
    },
    [deleteScheduler.rejected]: (state, action) => {
      state.loading = false;
      console.log("Update21");
      state.checkDelete = false;
    },
  },
});

export default schedulerSlice.reducer;
