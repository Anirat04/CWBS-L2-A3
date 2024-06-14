import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.services";
import { TSlotQueryParams } from "./slot.interface";

const createSlots = catchAsync(async (req, res) => {
  const slotData = req.body;
  const result = await SlotServices.createSlotsIntoDB(slotData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const { date, serviceId } = req.query;

  const queryParams: TSlotQueryParams = {
    date: date as string,
    serviceId: serviceId as string,
  };

  console.log("params: ", req.query);
  const result = await SlotServices.getAvailableSlotsFromDB(queryParams);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const SlotControllers = {
  createSlots,
  getAvailableSlots,
};
