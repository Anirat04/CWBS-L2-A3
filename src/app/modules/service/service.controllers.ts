import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.services";

const createService = catchAsync(async (req, res) => {
  const serviceData = req.body;
  const result = await ServiceServices.createServiceIntoDB(serviceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  // console.log("test", req.user);
  const result = await ServiceServices.getAllServicesFromDB();

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services retrieved successfully",
      data: result,
    });
  }
});

const getSingleService = catchAsync(async (req, res) => {
  const serviceId = req.params.id;

  const result = await ServiceServices.getSingleServiceFromDB(serviceId);

  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service retrieved successfully",
      data: result,
    });
  }
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const serviceData = req.body;
  const result = await ServiceServices.updateServiceInDB(id, serviceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const serviceId = req.params.id;

  const result = await ServiceServices.deleteServiceFromDB(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
