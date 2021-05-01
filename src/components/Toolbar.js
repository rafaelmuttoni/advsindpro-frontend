import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core'
import { Search as SearchIcon } from 'react-feather'

const Toolbar = ({ name, search, filter, setFilter, openModal }) => {
  return (
    <>
      <Box display="flex" justifyContent="flex-start">
        <Button color="primary" variant="contained" onClick={openModal}>
          Adicionar {name}
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder={`Procurar ${search ? search : name}`}
                variant="outlined"
                value={filter}
                onChange={({ target }) => setFilter(target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Toolbar
