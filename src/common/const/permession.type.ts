import { PureAbility } from '@casl/ability';
import { actionEnum } from './actionEnum';
import { routesEnum } from './routesEnum';

export type AppActions =
  | actionEnum.create
  | actionEnum.delete
  | actionEnum.manage
  | actionEnum.read
  | actionEnum.restore
  | actionEnum.softDelete
  | actionEnum.update;

export type AppSubjects =
  | routesEnum.users
  | routesEnum.roles
  | routesEnum.permissions
  | routesEnum.employees
  | routesEnum.customers
  | routesEnum.vendors
  | routesEnum.products
  | routesEnum.categories
  | routesEnum.subcategories
  | routesEnum.jobTitles
  | routesEnum.departments
  | routesEnum.tenants
  | routesEnum.loans
  | 'approved'
  | 'all';

export const actionValues = [
  actionEnum.create,
  actionEnum.delete,
  actionEnum.manage,
  actionEnum.read,
  actionEnum.restore,
  actionEnum.softDelete,
  actionEnum.update,
] as const;

export const subjectValues = [
  routesEnum.users,
  routesEnum.roles,
  routesEnum.permissions,
  routesEnum.employees,
  routesEnum.customers,
  routesEnum.vendors,
  routesEnum.products,
  routesEnum.categories,
  routesEnum.subcategories,
  routesEnum.jobTitles,
  routesEnum.departments,
  'all',
] as const;

export type Abilities = [AppActions, AppSubjects];

export type AppAbility = PureAbility<Abilities>;
