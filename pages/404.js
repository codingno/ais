import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from "next/image";
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../components/animate';

const NotFound = () => (
  <>
    <Head>
      <title>
        404 | AIS University
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            align="center"
            // color="textPrimary"
            variant="h1"
						// color="#E3A130"
						color="#003B5C"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            // color="textPrimary"
            variant="subtitle2"
						// color="#E3A130"
						color="#003B5C"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box className="bg-notfound-box" sx={{ textAlign: 'center', zIndex : -1, backgroundColor : '#111' }}>
            <Image
              src="/static/bg-notfound.jpeg"
							className='bg-notfound'
							layout="fill"
            />
          </Box>
                      <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Go back to Homepage
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
