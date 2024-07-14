import axiosInstance from '@/config/axios.config';

export interface IRes<T> {
  data: T;
  status: number;
  message: string;
  total?: number;
  current?: number;
  skip?: number;
}
export abstract class BasicCrud<T extends { id: string }, F> {
  protected endPoint = '';

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }
  async getAll(query: string = ''): Promise<IRes<T[]>> {
    const splitter = location.search.length > 0 ? '&' : '?';
    const res = await axiosInstance.get(this.endPoint + '' + location.search + splitter + query);
    return res.data;
  }
  async getOne(id: string): Promise<IRes<T>> {
    const res = await axiosInstance.get(`${this.endPoint}/${id}`);
    return res.data;
  }
  async create(data: F): Promise<IRes<T>> {
    const res = await axiosInstance.post(this.endPoint, data);
    return res.data;
  }
  async update(data: Partial<T>): Promise<IRes<T>> {
    const res = await axiosInstance.patch(`${this.endPoint}/${data.id}`, data);
    return res.data;
  }

  async delete(id: string) {
    const res = await axiosInstance.delete(`${this.endPoint}/${id}`);
    return res.data;
  }

  async softDelete(id: string) {
    const res = await axiosInstance.delete(`${this.endPoint}/soft/${id}`);
    return res.data;
  }

  async restore(id: string) {
    const res = await axiosInstance.patch(`${this.endPoint}/restore/${id}`);
    return res.data;
  }

  async approve(id: string) {
    const res = await axiosInstance.patch(`${this.endPoint}/approve/${id}`);
    return res.data;
  }
}
