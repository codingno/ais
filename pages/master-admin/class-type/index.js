import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { useState, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

import TopMenu from "../../../components/utils/TopMenu";
import StackContainer from "../../../components/utils/StackContainer";
import Stack from "@mui/material/Stack";

import editFill from "@iconify/icons-eva/edit-fill";
import { Icon } from "@iconify/react";
import CardMedia from "@mui/material/CardMedia";

import { useRouter } from "next/router";

import List from "../../../components/utils/List";

import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout
      title="Class Types"
		>
      <List
        title="Class Types"
        name="Class Type"
        getUrl="/api/class-type"
        addLink="/master-admin/class-type/create/"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "description", label: "Description", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/class-type/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/class-type",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
