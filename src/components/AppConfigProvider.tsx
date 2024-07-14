import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { i18n, router, queryClient, store } from '@/config';

const themeConfig = {
  token: {
    colorPrimary: '#1D4ED8', // Blue
    colorLink: '#1D4ED8', // Blue for links
    colorSuccess: '#10B981', // Green
    colorWarning: '#F59E0B', // Orange
    colorError: '#EF4444', // Red
    fontSize: 16, // Base font size
    colorText: '#1F2937', // Dark gray text
    colorTextSecondary: '#6B7280', // Lighter gray text
    borderRadius: 4, // Border radius
  },
};

const AppConfigProvider = () => {
  return (
    <I18nextProvider i18n={i18n.default}>
      <Provider store={store}>
        <ConfigProvider theme={themeConfig}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ConfigProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default AppConfigProvider;
