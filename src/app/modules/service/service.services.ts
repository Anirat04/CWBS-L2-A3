import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const newService = await Service.create(payload);
  return newService;
};

const getAllServicesFromDB = async () => {
  const allServices = await Service.find();
  return allServices;
};

const getSingleServiceFromDB = async (id: string) => {
  const singleService = await Service.findById(id);
  return singleService;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
};
