import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Input = (props) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          mt: 1.8,
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid #D5D8DE",
          "&:hover": {
            border: "1px solid #3A74D2",
            backgroundColor: "rgb(250,250,250)",
          },
          "& label": {
            display: "flex",
            alignSelf: "flex-start",
            marginLeft: 1,
          },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-basic"
        label={props.label}
        variant="filled"
        type={props.type}
        value={props.enterCode}
        onChange={props.handleChange}
        InputProps={props.inputProps}
      />
    </Box>
  );
};

export default Input;
