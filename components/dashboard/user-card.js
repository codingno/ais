import { useSession } from 'next-auth/react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';

import UserCardStudent from './user-card-student'
import { signOut } from "next-auth/react"

export const UserCard = (props) => {
  const theme = useTheme();
	const { data: session, status } = useSession()
  console.log(`🚀 ~ file: user-card.js ~ line 16 ~ UserCard ~ session, status`, session, status)

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Desktop',
      value: 63,
      icon: LaptopMacIcon,
      color: '#3F51B5'
    },
    {
      title: 'Tablet',
      value: 15,
      icon: TabletIcon,
      color: '#E53935'
    },
    {
      title: 'Mobile',
      value: 23,
      icon: PhoneIcon,
      color: '#FB8C00'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="User Data" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            position: 'relative',
						display: 'flex',
						justifyContent: 'space-between'
          }}
        >
          <Avatar
            sx={{
              height: 70,
              width: 70,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
					<Typography
						sx={{ m: 1 }}
						variant="h4"
					>
				{ session && session.user.name}	
      </Typography>
						</Box>
						<Box>
							<UserCardStudent />
						</Box>
      </CardContent>
    </Card>
  );
};
