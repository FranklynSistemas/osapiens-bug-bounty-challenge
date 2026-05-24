import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import i18n from "../../i18n";

const LanguageSelect: React.FC = () => {
  const updateLanguage = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.resolvedLanguage ?? "en"}
      onChange={updateLanguage}
      variant="standard"
      disableUnderline
      sx={{
        color: "white",
        mr: 2,
        "& .MuiSvgIcon-root": { color: "white" },
      }}
    >
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="de">DE</MenuItem>
    </Select>
  );
};

LanguageSelect.displayName = "LanguageSelect";

export default LanguageSelect;
