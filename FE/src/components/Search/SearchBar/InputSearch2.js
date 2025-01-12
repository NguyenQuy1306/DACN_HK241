import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import ModalSearch from "../../Modal/ModalSearch/ModalSearch";
import "./InputSearch.css";
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function InputSearch({ width, placeholder, iCon }) {
  const [open, setOpen] = React.useState(false);
  const [isArea, setIsArea] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(0); // For demo purposes.

      if (active) {
        setOptions([...provinces]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className="InputSearchDiv">
      <Autocomplete
        sx={{ width: width, height: 37 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={placeholder === "Khu vực" ? options : []}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Asynchronous"
            slotProps={{
              input: {
                ...params.InputProps,
                placeholder: placeholder,
                startAdornment: (
                  <>
                    {iCon}
                    {params.InputProps.startAdornment}
                  </>
                ),
                style: open
                  ? {
                      border: "2px solid #1c6359",
                      height: "42px",
                      top: "-2px",
                      left: "-3px",
                    }
                  : {
                      border: "none",
                      height: "37px",
                    },
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove border from the outer fieldset (default border)
                },
              },
            }}
          />
        )}
      />
      {open && placeholder === "Bàn muốn đặt chỗ đến đâu" && (
        <ModalSearch></ModalSearch>
      )}
    </div>
  );
}
