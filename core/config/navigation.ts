export interface IGlobalNavigationConfig {
  id: number;
  content: string;
  url: string;
}

export const globalNavigationConfig: IGlobalNavigationConfig[] = [
  { id: 0, content: "토픽", url: "/topics" },
  { id: 1, content: "인사이트", url: "/insights" },
  { id: 2, content: "서비스", url: "/services" },
];
