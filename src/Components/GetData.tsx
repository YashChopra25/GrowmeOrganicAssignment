import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import List from './List';
import { option } from './ListOption';



type Rowdata = {
  userId?: number;
  id?: number;
  title?: string;
  body?: string
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
  },
  {
    field: 'body',
    headerName: 'Content ',
    width: 400
  }
];





const GetData = () => {

  const demo: Rowdata[] = [];
  const navigate = useNavigate()
  const [islogged, setIslogged] = useState<string | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState(demo);
  useEffect(() => {
    if (!islogged) {
      navigate("/");
    }
  }, [islogged, navigate]);

  const Getdata = async (): Promise<Rowdata[]> => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsondata = await data.json();

    return jsondata
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Getdata();
        setRows(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const logout = () => {
    localStorage.removeItem('user')
    setIslogged(null);
  }
  return isLoading ? <p>Loading...</p> : (
    <>
      <Box sx={{ height: 600, width: '120%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          getRowHeight={() => 'auto'}

          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick

        />

      </Box>

      <Button variant="contained" onClick={logout}
        sx={{
          position: 'fixed', top: 10, right: 0
        }}>Logout</Button>
      <div className='option'>
        {
          option.map(item => {
           const  department = item.department
            const sub_department= item.sub_departments.map((dep)=>({name:dep}))
            return  <List department={department} sub_department={sub_department} />
          })
        }
      </div >

    </>
  )
}

export default GetData
