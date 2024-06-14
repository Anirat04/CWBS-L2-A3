import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const newService = await Service.create(payload);
  return newService;
};

const getAllServicesFromDB = async () => {
  const allServices = await Service.find({ isDeleted: false });
  return allServices;
};

// TODO: Prevent getting deleted service while getting it by ID
const getSingleServiceFromDB = async (id: string) => {
  const singleService = await Service.findById(id);
  if (singleService?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The Service has been deleted");
  }

  return singleService;
};

const updateServiceInDB = async (id: string, payload: Partial<TService>) => {
  const isServiceExistsById = await Service.findById(id);
  if (!isServiceExistsById) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This service is not found, can't update service!"
    );
  }

  // checking if the service is already deleted
  const isDeleted = isServiceExistsById?.isDeleted;

  if (isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This Service is deleted, can't update service!"
    );
  }

  const updatedService = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedService;
};

const deleteServiceFromDB = async (id: string) => {
  const isServiceExistsById = await Service.findById(id);
  if (!isServiceExistsById) {
    throw new AppError(httpStatus.NOT_FOUND, "This service is not found !");
  }

  // checking if the service is already deleted
  const isDeleted = isServiceExistsById?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This Service is deleted !");
  }

  const deleteService = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return deleteService;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
};
