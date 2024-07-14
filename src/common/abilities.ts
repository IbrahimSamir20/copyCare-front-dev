import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';

import { User } from '@/routes/$tenant/users/-components/interface/user.interface';
import { AppAbility } from './const/permession.type';

const createAbilityForUser = async (user: User): Promise<AppAbility> => {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility as AbilityClass<AppAbility>);

  user.role.permissions.forEach((permission) => {
    can(permission.action, permission.subject); // Convert string to Subjects type
  });

  return build();
};

export default createAbilityForUser;
