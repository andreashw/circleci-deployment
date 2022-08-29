export interface IResponse<T> {
  success: Boolean;
  message: string;
  title?: string;
  data: T;
}
