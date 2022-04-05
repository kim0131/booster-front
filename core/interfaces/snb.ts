export interface ISnbData {
  id: number;
  category: string;
  menus: { id: number; content: string; param: string }[];
}
