import React, { useState, useEffect, useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
// import BasicLayout from "../../../components/utils/BasicLayout";
import BasicLayout from "../../../../components/utils/BasicLayout";
// import CourseRegistrationCard from "../../../components/utils/courses-selection/CourseRegistrationCard";
// import CourseRegistrationCard from "../../../../components/utils/courses-selection/CourseRegistrationCard";
import VisaPDF from "../visapdf";
import VisaPDF2 from "../visapdf2";
import VisaPDF3 from "../visapdf3";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { useRouter } from "next/router";

export default function pdf() {
  let ref = useRef(null);
  let ref2 = useRef(null);
	
	const router = useRouter()
	const { id } = router.query

	const [dataVisa, setDataVisa] = useState(null)

	useEffect(() => {
		if(id)
			getVisaData()

		async function getVisaData() {
			try {
				const { data } = await axios.get('/api/visa-form?id='+id)
        console.log(`🚀 ~ file: [id].jsx ~ line 33 ~ getVisaData ~ data`, data)
				if(data) {
					if(data[0])
						setDataVisa(data[0])
				}
			} catch (error) {
				if(error.response)	
					alert(error.response.data)
				else
					alert(error)
			}	
		}
	}, [id])
	
	
  const exportPDF = async () => {
    // console.log(ref)
    await ref.save();
  };
  const exportPDF2 = async () => {
    // console.log(ref)
    await ref2.save();
  };
  const exportPDF3 = async () => {
    // console.log(ref)
    await ref2.save();
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
                    height: 792,
                    width: 612,
                    padding: "none",
                    backgroundColor: "white",
                    boxShadow: "5px 5px 5px black",
                    margin: "30px auto",
                    overflowX: "hidden",
                    overflowY: "hidden",
										transform : 'scale(1.5)',
                  }}
                >
                  {/* <CourseRegistrationCard /> */}
									<VisaPDF data={dataVisa}/>
                </div>
              </PDFExport>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              p={5}
            >
              {/* <button onClick={exportPDF}>download</button> */}
							<Button
								variant="contained"
								onClick={exportPDF2}
							>
								Download PDF2
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
                ref={(r) => (ref2 = r)}
              >
                <div
                  style={{
                    height: 792,
                    width: 612,
                    padding: "none",
                    backgroundColor: "white",
                    boxShadow: "5px 5px 5px black",
                    margin: "30px auto",
                    overflowX: "hidden",
                    overflowY: "hidden",
										transform : 'scale(1.5)',
                  }}
                >
                  {/* <CourseRegistrationCard /> */}
									<VisaPDF2 data={dataVisa}/>
                </div>
              </PDFExport>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              p={5}
            >
              {/* <button onClick={exportPDF}>download</button> */}
							<Button
								variant="contained"
								onClick={exportPDF3}
							>
								Download PDF3
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
                ref={(r) => (ref2 = r)}
              >
                <div
                  style={{
                    height: 792,
                    width: 612,
                    padding: "none",
                    backgroundColor: "white",
                    boxShadow: "5px 5px 5px black",
                    margin: "30px auto",
                    overflowX: "hidden",
                    overflowY: "hidden",
										transform : 'scale(1.5)',
                  }}
                >
                  {/* <CourseRegistrationCard /> */}
									<VisaPDF3 data={dataVisa}/>
                </div>
              </PDFExport>
            </Stack>
          </Card>
        </Grid>
      </BasicLayout>
    </>
  );
}
