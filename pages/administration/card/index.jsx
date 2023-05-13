import React, { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import BasicLayout from "../../../components/utils/BasicLayout";
import StudentCard from "../../../components/utils/StudentCard";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react"

export default function card() {
  let ref = useRef(null);
	const { data: session, status : statusSession } = useSession()
  const exportPDF = () => {
    // console.log(ref)
    ref.save();
  };

  return (
    <>
      <BasicLayout>
        <Grid item xs={10} p={1}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              p={5}
            >
							<Typography variant="h5" gutterBottom>
								Student ID
							</Typography>
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
              p={5}
            >
              <PDFExport
                // paperSize={[ '3.5in', '2in']}
								landscape={true}
                fileName="_____.pdf"
                title=""
                subject=""
                keywords=""
                ref={(r) => (ref = r)}
              >
                <div
                  style={{
                    height: 600,
                    width: 1050,
										// height: '2in',
										// width: '3.5in',
                    padding: "none",
                    backgroundColor: "white",
                    // boxShadow: "5px 5px 5px #bbb",
										// border: "1px solid #bbb",
										// borderRadius: "20px",
                    // margin: "30px auto",
                    // overflowX: "hidden",
                    // overflowY: "hidden",
                  }}
                >
									{
										statusSession == 'authenticated' &&
										<StudentCard />
									}
                </div>
              </PDFExport>
            </Stack>
          </Card>
        </Grid>
      </BasicLayout>
    </>
  );
}
