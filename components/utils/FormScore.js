import {
  Typography,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@mui/material";

export default function FormScore(props) {
  const {
    aspect,
    feature,
    handleChange,
    teacherScoring,
    questions,
    type,
    score,
  } = props;

  return (
    <>
      {teacherScoring ? (
        <>
          {aspect.map((aspect) => (
            <>
              <Typography variant="h5">
                {aspect.aspect}
                {feature.map((feature, index) => (
                  <>
                    {feature.aspects_id === aspect.id && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormLabel>{feature.features}</FormLabel>
                        <RadioGroup row onChange={handleChange} name="score">
                          <FormControlLabel
                            value="1"
                            control={<Radio id={feature.id} />}
                            label="1"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio id={feature.id} />}
                            label="2"
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio id={feature.id} />}
                            label="3"
                          />
                          <FormControlLabel
                            value="4"
                            control={<Radio id={feature.id} />}
                            label="4"
                          />
                          <FormControlLabel
                            value="5"
                            control={<Radio id={feature.id} />}
                            label="5"
                          />
                        </RadioGroup>
                      </Stack>
                    )}
                  </>
                ))}
              </Typography>
            </>
          ))}
        </>
      ) : (
        <>
          {questions.map((question, index) => (
            <>
              {question.type === type && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel>{question.question}</FormLabel>
                  <RadioGroup row onChange={handleChange} name="score">
                    <FormControlLabel
                      value="1"
                      control={<Radio id={question.id} />}
                      label="1"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio id={question.id} />}
                      label="2"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio id={question.id} />}
                      label="3"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio id={question.id} />}
                      label="4"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio id={question.id} />}
                      label="5"
                    />
                  </RadioGroup>
                </Stack>
              )}
            </>
          ))}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Sub Total</Typography>
            <Typography variant="h5">{score}</Typography>
          </Stack>
        </>
      )}
    </>
  );
}
