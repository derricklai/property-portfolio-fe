import api from "./client";

// Type Definitions
export interface PropertySummary {
  id: string | number;
  name: string;
  latest_value?: number | null;
}

export interface PropertyValuation {
  date: string;
  amount: number;
}

export interface PropertyDetail {
  id: string | number;
  name: string;
  valuations: PropertyValuation[];
}

export async function listProperties() {
  const { data } = await api.get("/api/v1/properties");
  return data;
}

export async function getProperty(id: string | number) {
  const { data } = await api.get(`/api/v1/properties/${id}`);
  return data;
}

export async function createProperty(data: { name: string; address: string }) {
  const res = await api.post("/api/v1/properties", data);
  return res.data;
}
