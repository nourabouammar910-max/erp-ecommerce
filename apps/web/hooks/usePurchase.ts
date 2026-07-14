export interface PurchaseItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreatePurchaseDto {
  supplierId: string;
  warehouseId: string;
  total: number;
  items: PurchaseItem[];
}