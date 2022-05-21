import { makeStyles } from "@material-ui/core/styles";

const StyleTextFieldListPage = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#959595",
      },
      "&:hover fieldset": {
        borderColor: "#959595",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#959595",
      },
    },
  },
}));

export { StyleTextFieldListPage };
