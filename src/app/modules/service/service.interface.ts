export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number; // Duration in minutes
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
