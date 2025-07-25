import { Button, Menu, MenuItem } from "@mui/material";
import { I18n } from "../login/i18n";
import { Language as LanguageIcon } from '@mui/icons-material'
import { CSSProperties, MouseEvent, useState } from "react";
const LanguageSelect = ({ i18n, style }: { i18n: I18n, style?: CSSProperties }) => {
  const { currentLanguage, enabledLanguages } = i18n
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (href?: string) => {
    if(href?.length) {
      window.location.href = href
    }
    setTimeout(() => {
      setAnchorEl(null)
    }, 0)

  }

  style = {
    ...style,
    color: '#444'
  }

  return (
    <Button aria-haspopup="true" onClick={handleClick} startIcon={<LanguageIcon />} style={style}>
      { currentLanguage.label }
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
        {enabledLanguages.map(({ href, label, languageTag }) => (
          <MenuItem onClick={() => handleClose(href)} selected={languageTag === currentLanguage.languageTag} key={languageTag}>{label}</MenuItem>
        ))}
      </Menu>
    </Button>
  )
}

export { LanguageSelect }