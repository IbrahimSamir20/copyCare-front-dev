import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const GoogleLogin = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-4 w-full">
      <Button
        className="w-full"
        onClick={async () => {
          window.location.href = 'http://localhost:5000/api/auth/google';
        }}
      >
        {t('login_with_google')}
      </Button>
    </div>
  );
};

export default GoogleLogin;
