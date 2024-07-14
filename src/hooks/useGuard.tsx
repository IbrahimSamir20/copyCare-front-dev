import { actionEnum } from '@/common/const/actionEnum';
import { AppSubjects } from '@/common/const/permession.type';
import { routesEnum } from '@/common/const/routesEnum';
import { selectAbilities } from '@/common/state/abilities.state';
import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  action: actionEnum;
  route: routesEnum;
}

const useGuard = ({ action, route }: Props) => {
  const abilities = useSelector(selectAbilities);
  const { tenant } = useParams({ strict: false });
  useEffect(() => {
    if (abilities) {
      const hasAbility = abilities.can(action, route as AppSubjects);
      if (!hasAbility) {
        location.replace(`/${tenant}`);
      }
    }
  }, [abilities, action, route, tenant, location.pathname]);
};

export default useGuard;
