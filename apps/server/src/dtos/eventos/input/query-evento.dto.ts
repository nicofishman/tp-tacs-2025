export type FindEventosQueryDto = {
  dateFrom?: string;
  dateTo?: string;
  categoriaId?: string;
  priceMin?: number;
  priceMax?: number;
  q?: string;
  limit?: number;
  page?: number;
  orderBy?: "fechaInicio" | "precio";
  order?: "asc" | "desc";
};
