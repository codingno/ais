import React, { useRef } from "react";
import { useRouter } from "next/router";
import { PDFExport } from "@progress/kendo-react-pdf";
import BasicLayout from "../../../../components/utils/BasicLayout";
import TranscriptCard from './TranscriptCard'
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function pdf() {
	const router = useRouter()
	const { id } = router.query
  let ref = useRef(null);
	let divRef = useRef(null)
  const exportPDF = async () => {
    // console.log(ref)
		// divRef.current.style.height = 792
		// divRef.current.style.width= 612
		// console.log(divRef)
		// divRef.style.visibility= 'show'
		// setTimeout(() => {
		// 	divRef.style.visibility= 'show'
		// }, 3000)
		// divRef.style.transform= 'scale(1.5)'
    await ref.save();
  };

	if(!id)
		return ""

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
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              p={20}
							// sx={{
							// 	visibility : 'hidden'
							// }}
            >
                <div
                	// ref={(r) => (divRef = r)}
                  style={{
                    height: 792,
                    width: 612,
                    // height: '100%',
                    // width: '100%',
                    padding: "none",
                    backgroundColor: "white",
                    boxShadow: "5px 5px 5px black",
                    margin: "30px auto",
                    overflowX: "hidden",
                    overflowY: "hidden",
										transform : 'scale(1.5)'
                  }}
                >
                  <TranscriptCard id={id} />
                </div>
						</Stack> */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              p={20}
							// sx={{
							// 	visibility : 'hidden'
							// }}
              ref={(r) => (divRef = r)}
            >
              <PDFExport
                // paperSize={"Letter"}
                fileName="_____.pdf"
                title=""
                subject=""
                keywords=""
                ref={(r) => (ref = r)}
								style={{
									transform : 'scale(1.5)',
									width : 'calc(792*1.5)',
									height : 'calc(612*1.5',
								}}
              >
                <div
                  style={{
                    height: 792,
                    width: 612,
                    // height: 970.58,
                    // width: 700,
                    // height: 1164.70,
                    // width: 830,
                    // height: '100%',
                    // width: '100%',
                    padding: "none",
                    backgroundColor: "white",
                    boxShadow: "5px 5px 5px black",
                    margin: "10px auto",
                    overflowX: "hidden",
                    overflowY: "hidden",
										transform : 'scale(1.5)'
                  }}
                >
                  <TranscriptCard id={id} />
                </div>
              </PDFExport>
            </Stack>
          </Card>
        </Grid>
      </BasicLayout>
    </>
  );
}
