import { createLazyFileRoute, Outlet } from '@tanstack/react-router';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from 'src/locales';
import authBg from '../assets/auth-bg.webp';

const { Content } = Layout;

export const Route = createLazyFileRoute('/_auth')({
  component: Auth,
});

function Auth() {
  const { t } = useTranslation();

  return (
    <Layout className="h-screen">
      <Content className="flex">
        <section className="relative z-10 flex h-full w-full items-center justify-center p-8 lg:w-2/3 lg:bg-white">
          <div className="flex flex-col rounded-lg bg-white p-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold">{t('welcome' as TranslationKeys)}</h2>
              <p className="text-sm text-gray-600">{t('description' as TranslationKeys)}</p>
              <p className="mb-8 text-sm text-gray-600">{t('get_started' as TranslationKeys)}</p>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </section>
        <div
          className="fixed left-0 top-0 z-0 h-screen w-screen bg-cover bg-center lg:relative lg:block lg:w-1/3"
          style={{ backgroundImage: `url(${authBg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </Content>
    </Layout>
  );
}
