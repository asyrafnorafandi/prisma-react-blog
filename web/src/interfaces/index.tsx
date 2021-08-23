export interface RouteConfig {
  path: string;
  component: () => JSX.Element;
  name?: string;
  logo: JSX.Element;
}
