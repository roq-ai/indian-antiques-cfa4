const mapping: Record<string, string> = {
  authentications: 'authentication',
  marketplaces: 'marketplace',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
