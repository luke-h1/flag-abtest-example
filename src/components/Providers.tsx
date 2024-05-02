'use client';

import { isServer } from '@frontend/util/isServer';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

if (!isServer) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    loaded: app => {
      if (process.env.NODE_ENV === 'development') {
        app.debug();
      }
    },
  });
}

const Providers = ({ children }: Props) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default Providers;
