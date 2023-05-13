import Head from 'next/head';
import { SessionProvider } from 'next-auth/react'
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import '../components/utils/courses-selection/pdf-style.css'
// import './signin.css'
import './styles.css'

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
					AIS | University
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
					<SessionProvider
						// Provider options are not required but can be useful in situations where
						// you have a short session maxAge time. Shown here with default values.
						options={{
							// Stale Time controls how often the useSession in the client should
							// contact the server to sync the session state. Value in seconds.
							// e.g.
							// * 0  - Disabled (always use cache value)
							// * 60 - Sync session state with server if it's older than 60 seconds
							staleTime: 0,
							// Refetch Interval tells windows / tabs that are signed in to keep sending
							// a keep alive request (which extends the current session expiry) to
							// prevent sessions in open windows from expiring. Value in seconds.
							//
							// Note: If a session has expired when keep alive is triggered, all open
							// windows / tabs will be updated to reflect the user is signed out.
							refetchInterval: 0
						}}
						session={pageProps.session} >
						{getLayout(<Component {...pageProps} />)}
					</SessionProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
