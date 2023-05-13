import React, { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import BasicLayout from "../../../components/utils/BasicLayout";
import CourseRegistrationCard from "../../../components/utils/courses-selection/CourseRegistrationCard";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function pdf() {
  let ref = useRef(null);
  const exportPDF = async () => {
    // console.log(ref)
    await ref.save();
  };

  return (
    <>
      <BasicLayout>
        <Grid item xs={10} p={1}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              p={5}
              pb={20}
            >
              {/* <button onClick={exportPDF}>download</button> */}
							<Button
								variant="contained"
								onClick={exportPDF}
							>
								Download PDF
							</Button>
						</Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              p={20}
            >
              <PDFExport
                // paperSize={"Letter"}
                fileName="_____.pdf"
                title=""
                subject=""
                keywords=""
                ref={(r) => (ref = r)}
              >
                <div
                  style={{
                    // height: 792,
                    // width: 612,
                    height: 1164.70,
                    width: 830,
                    padding: "none",
                    backgroundColor: "white",
                    boxShadow: "5px 5px 5px black",
                    margin: "10px 10px auto",
                    overflowX: "hidden",
                    overflowY: "hidden",
										transform : 'scale(1.5)',
                  }}
                >
                  <CourseRegistrationCard />
                </div>
              </PDFExport>
            </Stack>
          </Card>
        </Grid>
      </BasicLayout>
    </>
  );
}
