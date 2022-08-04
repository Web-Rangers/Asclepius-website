import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "../../styles/SignIn.module.css";

export const Input = (props) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 3,
          width: 360,
          display: "flex",
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
        label="Enter code"
        variant="filled"
        type="text"
        value={enterCode}
        onChange={handleChange}
        InputProps={{
          className: classes.inputStyle,
        }}
      />
    </Box>
  );
};
