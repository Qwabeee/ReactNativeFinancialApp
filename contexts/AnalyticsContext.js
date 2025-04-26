import React, { createContext, useContext, useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import { useAuth } from './AuthContext';

const AnalyticsContext = createContext({});

export const AnalyticsProvider = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      Sentry.setUser({
        id: user.uid,
        email: user.email,
      });
    }
  }, [user]);

  const trackEvent = (eventName, properties = {}) => {
    try {
      Sentry.addBreadcrumb({
        category: 'user_action',
        message: eventName,
        level: 'info',
        data: properties,
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  const trackError = (error, context = {}) => {
    try {
      Sentry.captureException(error, {
        extra: context,
      });
    } catch (sentryError) {
      console.error('Error tracking error:', sentryError);
    }
  };

  const trackScreenView = (screenName) => {
    try {
      Sentry.addBreadcrumb({
        category: 'navigation',
        message: `Viewing screen: ${screenName}`,
        level: 'info',
      });
    } catch (error) {
      console.error('Error tracking screen view:', error);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        trackError,
        trackScreenView,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  return useContext(AnalyticsContext);
}; 