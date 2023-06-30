import { MarketplaceInterface } from 'interfaces/marketplace';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AuthenticationInterface {
  id?: string;
  status: string;
  marketplace_id?: string;
  authenticator_id?: string;
  created_at?: any;
  updated_at?: any;

  marketplace?: MarketplaceInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AuthenticationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  marketplace_id?: string;
  authenticator_id?: string;
}
