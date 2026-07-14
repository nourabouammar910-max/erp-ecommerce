import axios from "axios";
import { CreatePurchaseDto } from "@/types/purchase";

export const createPurchase = async (dto: CreatePurchaseDto) => {
  const { data } = await axios.post("/api/purchases", dto);
  return data;
};