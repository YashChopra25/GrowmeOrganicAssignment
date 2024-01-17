import * as React from 'react';
import './App.css';
import validator  from 'validator'
import { Box, Button } from '@mui/material';
import { TextField } from '@mui/material';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import GetData from './Components/GetData';



type UserType = {
  name: string;
  email: string;
  phone: string;
};
const AddUser = () => {
const navigate=useNavigate()
  const [user, setUser] = React.useState<UserType>({
    name: "",
    email: "",
    phone: "",
  });

  const [infoname, setInfoname] = React.useState<boolean>(true);
  const [infoemail, setInfoemail] = React.useState<boolean>(true);
  const [infophone, setInfophone] = React.useState<boolean>(true);
  const[errormessage,seterrormessage]=React.useState<string>("failes")
  const removeError = (): void => {
    setInfoname(true);
    setInfoemail(true);
    setInfophone(true);
  };

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    removeError();
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    removeError();
    if (!user.name.trim()) {
      setInfoname(false);
      seterrormessage("Enter Name")
      return false;
    } else if(!validator.isEmail(user.email)){
      setInfoemail(false);
      !user.email.trim()? seterrormessage("Enter  Email"):
      seterrormessage("Enter a valid Email")
      return false;
    }  else if (!user.phone.trim()) {
      setInfophone(false);
      seterrormessage("Enter Phone")
      return false;
    } else if (!validator.isNumeric(user.phone.trim()) ){
      setInfophone(false);
      seterrormessage("Enter valid Phone")
      return false;
    }
   
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/data");
  
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch', display: 'flex' },
        }}
      >
        <TextField
          id="outlined"
          label="Name"
          variant="standard"
          placeholder="Enter a name"
          type="text"
          error={!infoname}
          helperText={!infoname ? errormessage: ""}
          name="name"
          value={user.name}
          onChange={handleField}

        />
        <TextField
          id="outlined"
          label="Email"
          variant="standard"
          placeholder="Enter an email"
          type="text"
          error={!infoemail}
          helperText={!infoemail ? errormessage : ""}
          name="email"
          value={user.email}
          onChange={handleField}

        />
        <TextField
          id="outlined"
          label="Phone"
          variant="standard"
          placeholder="Enter a phone"
          type="text"
          error={!infophone}
          helperText={!infophone ? errormessage: ""}
          name="phone"
          value={user.phone}
          onChange={handleField}

        />
        <Button variant="contained" type="submit" color='success'>
          Submit
        </Button>
      </Box>
    </React.Fragment>
  );
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={<AddUser />}
          />
    
          <Route 
            path='/data'
            element={<GetData/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )

}
export default App;
