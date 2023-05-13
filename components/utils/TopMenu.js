import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import ImageWithLoader from "../../utils/ImageWithLoader";
import MenuPopover from "./MenuPopover";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import UserSide from "./UserSide";

const topMenuList = [
  {
    name: "Profile",
    role: [3, 5],
    link: "teacher/profile",
    width: 300,
  },
  {
    name: "Administrations",
    role: [4],
    width: 300,
    child: [
      {
        name: "Profile",
        link: "administration/profile",
        role: 4,
      },
      {
        name: "Student ID Card",
        link: "administration/card",
        role: 4,
      },
      {
        name: "Payment",
        link: "administration/payment",
        disable: true,
        role: 4,
      },
      {
        name: "Visa/Kitas Report",
        link: "administration/visa",
        // disable : true,
        role: 3,
      },
      {
        // name: "Visa/Kitas Form",
        name: "VISA/ KITAS Application",
        link: "administration/visa/form/list",
        // disable : true,
        role: 4,
      },
      {
        name: "Study leave",
        link: "administration/leave",
        // disable : true,
        role: 4,
      },
      {
        name: "Approval for Study Leave",
        link: "administration/leave-approval",
        // disable : true,
        role: 3,
      },
    ],
  },
  {
    name: "Academics",
    role: [2, 3, 4, 5],
    child: [
      {
        name: "Curriculums",
        link: "academic/curriculum",
        role: [2,5],
      },
      {
        name: "Courses",
        link: "academic/course",
        role: [2,5],
      },
      {
        name: "Course Schedule",
        link: "academic/schedule",
        role: [2,3,5],
      },
      {
        name: "Courses Approval",
        link: "academic/courses-approval",
        role: [2,3],
      },
      {
        name: "Courses Selection",
        link: "academic/courses-selection",
        role: 4,
      },
      {
        name: "Grade",
        link: "academic/grade",
        role: [3,4,5],
      },
      {
        name: "Academic Transcript",
        link: "academic/transcript",
        // disable : true,
        role: 4,
      },
      {
        name: "Course Evaluation",
        link: "academic/course-scoring",
        role: 4,
      },
    ],
  },
  {
    name: "Master Data",
    role: [2,5],
    child: [
      {
        name: "University Identity",
        link: "master/college",
        role: 1,
      },
      {
        name: "Faculty",
        link: "master/faculty",
        role: [2,5],
      },
      {
        name: "Study Program",
        link: "master/departement",
        role: [2,5],
      },
      {
        name: "Lecturer",
        link: "master/teacher",
        role: [2,5],
      },
      {
        name: "Student",
        link: "master/student",
        role: [2,5],
      },
    ],
  },
  {
    name: "Lecturer Portfolio",
    role: [3, 5],
    link: "portfolio/achievement",
    width: 300,
  },
  {
    name: "Academic Portfolio",
    width: 380,
    role: [4,],
    child: [
      {
        name: "Professional Development",
        link: "portfolio/development",
        // disable : true,
        role: [3, 4, 5],
      },
      {
        name: "Degree Candidacy",
        link: "portfolio/candidacy",
        // disable : true,
        role: [3, 4, 5],
      },
      {
        name: "Academic Advising",
        link: "portfolio/advising",
        // disable : true,
        role: [3, 4, 5],
      },
      {
        name: "Thesis/Disertation",
        link: "portfolio/thesis_disertation",
        // disable : true,
        role: [3, 4, 5],
      },
      {
        name: "Application for Student Exchange",
        link: "portfolio/student_exchange",
        // disable : true,
        role: [3, 4, 5],
      },
      {
        name: "Application for Research Financial Support",
        link: "portfolio/financial_support",
        disable: true,
        role: [3, 4, 5],
      },
    ],
  },
  {
    name: "Info",
    width: 380,
    role: [1, 2],
    child: [
      {
        name: "Calendar Academic",
        link: "info/calendar",
        // disable : true,
        role: 4,
      },
      {
        name: "Academic Guides",
        link: "info/guides",
        // disable : true,
        role: 4,
      },
      {
        name: "Academic News",
        link: "info/news",
        // disable : true,
        role: 4,
      },
    ],
  },
  {
    name: "Admin",
    role: [1],
    child: [
      {
        name: "User Role",
        link: "master-admin/role",
      },
      {
        name: "Identity type",
        link: "master-admin/identity-type",
      },
      {
        name: "Study type",
        link: "master-admin/study-type",
      },
      {
        name: "Class type",
        link: "master-admin/class-type",
      },
      {
        name: "Course type",
        link: "master-admin/course-type",
      },
      {
        name: "Course Group",
        link: "master-admin/course-group",
      },
      {
        name: "Rooms",
        link: "master-admin/room",
      },
      {
        name: "Lecturer Status",
        link: "master-admin/teacher-status",
      },
      {
        name: "Student Status",
        link: "master-admin/student-status",
      },
      {
        name: "Financial Status",
        link: "master-admin/finance-status",
      },
      {
        name: "Religion",
        link: "master-admin/religion",
      },
      {
        name: "Grade",
        link: "master-admin/grade",
      },
      {
        name: "Grade Aspect",
        link: "master-admin/grade-aspect",
      },
      {
        name: "Lecturer Scoring",
        link: "master-admin/teacher-scoring",
      },
      {
        name: "Evaluation Questions",
        link: "master-admin/eval-questions",
      },
    ],
  },
];

function ChildMenu({ child }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const renderChild = child.map((item, index) => {

    if(item.name == "Courses Approval") {
      if(session?.user?.teacherData?.id != session?.user?.teacherData?.departement?.teacher_id)
        return ""
    }

    return (
      <Stack key={index}>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            my: 1,
            cursor: "pointer",
            opacity: !item.disable ? 1 : 0.3,
          }}
          onClick={() => {
            if (!item.disable) router.push("/" + item.link);
          }}
        >
          {item.name}
        </Typography>
        {index != child.length - 1 && <Divider />}
      </Stack>
    );
  });
  return <Box sx={{ my: 1.5, px: 2.5 }}>{renderChild}</Box>;
}

function ItemMenu({ menu }) {
  const { data: session, status } = useSession();
  // console.log("🚀 ~ file: TopMenu.js ~ line 314 ~ ItemMenu ~ session", session)
  const filterMenu = menu.child
    ? session.user.isAdmin
      ? menu.child
      // : menu.child.filter((item) => item.role >= session.user.role_id)
      : menu.child.filter(item => Array.isArray(item.role) ? item.role.indexOf(session.user.role_id) >= 0 : item.role == session.user.role_id)
    : [];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  let anchorRef = useRef(null);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (menu.child) setOpen(true);
          else router.push("/" + menu.link);
        }}
        ref={anchorRef}
      >
        {menu.name}
      </Button>
      {/* {menu.child && (
        <MenuPopover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
          sx={{ width: menu.width || 220 }}
        >
          <ChildMenu child={menu.child} />
        </MenuPopover>
      )} */}
      {menu.child && (
        <MenuPopover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
          sx={{ width: menu.width || 220 }}
        >
          <ChildMenu child={filterMenu} />
        </MenuPopover>
      )}
    </>
  );
}

function ParentMenu({ menu }) {
  const { data: session, status } = useSession();
  // const filterMenu = menu.filter(item => item.role >= session.user.role_id)
  let filterMenu = session.user.isAdmin
    ? menu
    : menu.filter((item) => item.role.indexOf(session.user.role_id) > -1);
  // if(session.user.isAdmin)
  // 	filterMenu.shift()
  const renderMenu = filterMenu.map((item, index) => (
    <ItemMenu key={index} menu={item} />
  ));
  return <>{renderMenu}</>;
}

export default function (props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if(status == 'unauthenticated') {
    router.push("/auth/signin")
    return ""
  }

  return (
    <>
      {/* <Grid item xs={2.5}></Grid> */}
      <Grid
        item
        xs={12}
        pt={3}
        px={1}
        // spacing={0}
        // direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        // wrap="wrap"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          m={1}
        >
          <ImageWithLoader
          // <img
            src="/static/homepage-logo.png"
            alt="logo"
            width={363}
            height={100}
            onClick={() => router.push("/")}
          />
          {session && (
            <>
              {(session.user.isStudent && session.user.studentData.status) ||
              !session.user.isStudent ? (
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  alignContent="stretch"
                  wrap="wrap"
                  sx={{
                    py: 3,
                  }}
                >
                  <ButtonGroup
                    variant="text"
                    // color="primary"
                    aria-label=""
                    sx={{
                      mx: "auto",
                    }}
                  >
                    <ParentMenu menu={topMenuList} />
                  </ButtonGroup>
                </Grid>
              ) : (
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  alignContent="stretch"
                  wrap="wrap"
                  sx={{
                    py: 3,
                  }}
                ></Grid>
              )}
              <Button
                variant="contained"
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                sx={{
                  width: 200,
                }}
              >
                Sign out
              </Button>
            </>
          )}
          {!session && (
            <Button
              variant="contained"
              onClick={() => router.push("/auth/signin")}
              sx={{
                width: 200,
              }}
            >
              Sign in
            </Button>
          )}
        </Stack>
      </Grid>
      {/* <Grid item xs={2.5}></Grid> */}
      {router.pathname !== "/administration/profile" &&
      router.pathname !== "/teacher/profile" &&
      session &&
      ((session.user.isStudent && session.user.studentData.status) ||
        !session.user.isStudent) ? (
        <UserSide />
      ) : (
        ""
      )}
    </>
  );
}
