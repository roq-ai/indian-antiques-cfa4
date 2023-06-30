import { AuthenticationInterface } from 'interfaces/authentication';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MarketplaceInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  authentication?: AuthenticationInterface[];
  user?: UserInterface;
  _count?: {
    authentication?: number;
  };
}

export interface MarketplaceGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
