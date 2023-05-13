import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import axios from "axios";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function TeacherFeature() {
  const router = useRouter();
  const { data: session, status: statusSession } = useSession();

  const [aspect, setAspect] = useState([]);
  const [id, setId] = useState("");

  async function getAspects() {
    try {
      const { data } = await axios.get("/api/teacher-scoring");
      setAspect(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (!session && statusSession == `unauthenticated`)
      router.push("/auth/signin");

    if (statusSession === "loading" || statusSession === "unauthenticated")
      return (
        <div
          style={{ width: "100vw", heght: "100vh", backgroundColor: "#C7C9C7" }}
        ></div>
      );

    if (!router.isReady) return null;
    if (router.query.id) {
      setId(router.query.id);
    }

    if (aspect.length === 0) getAspects();
  }, [router.isReady, session, statusSession, aspect]);

  if (aspect.length === 0) return null;
  console.log(aspect);

  return (
    <BasicLayout
      title={"Teacher Scoring " + aspect[id - 1].aspect + " Feature"}
    >
      <List
        title={"Teacher Scoring " + aspect[id - 1].aspect + " Feature"}
        name={"Teacher Scoring " + aspect[id - 1].aspect + " Feature"}
        getUrl={"/api/teacher-feature?aspects_id=" + id}
        addLink={"/master-admin/teacher-feature/create/" + id}
        tableHead={[
          { id: "features", label: "Feature", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master-admin/teacher-feature/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/teacher-feature",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
