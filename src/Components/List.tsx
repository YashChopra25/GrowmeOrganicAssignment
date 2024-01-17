import React, { useEffect, useState } from 'react'

type objtype = {
  name: string,
  isChecked?: boolean
}


type propsType = {
  department: string
  sub_department: objtype[]
}

const List = ({ department, sub_department }: propsType) => {
  const [users, setUsers] = useState<objtype[] | []>([]);
  const [ishide, SetIshide] = useState<boolean | false>(false)
  useEffect(() => {
    setUsers(sub_department)
  }, [])

  const handlechage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target
    if (name == department) {
      let tempuser = users.map(user => { return { ...user, isChecked: checked } })
      setUsers(tempuser);
    }
    else {

      let tempuser = users?.map((user) => user.name === name ? { ...user, isChecked: checked } : user)
      setUsers(tempuser);
    }
  }
  return (

    <div className='flex'>
      <div>

        <span onClick={()=>SetIshide(!ishide)} style={{fontWeight:'bolder', marginRight:'10px'}}>
          {ishide ?
            "+" : "-"
          }
        </span>

        <input type="checkbox" name={department} id={department} onChange={handlechage}
          checked={users?.filter((user) => user?.isChecked !== true).length < 1 || false}
        />{department}</div>
      <div  className={"sub_options " + (ishide?'hide':"")}>
        {
          users?.map((user, index) => (
            <span key={index}>
              <input type="checkbox" name={user.name}
                checked={user?.isChecked || false}
                onChange={handlechage}
              />{user.name}
            </span>
          ))
        }
      </div>

    </div>

  )
}

export default List