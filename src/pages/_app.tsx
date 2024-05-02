import '@frontend/styles/globals.css';
import type { AppProps } from 'next/app';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: client => {
      if (process.env.NODE_ENV === 'development') client.debug();
    },
  });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PostHogProvider client={posthog}>
      <Component {...pageProps} />
    </PostHogProvider>
  );
}
