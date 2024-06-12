import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.services";

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

export const SlotControllers = {
  createSlots,
};
