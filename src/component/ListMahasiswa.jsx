import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from "reactstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../App';

const api = 'http://localhost:3001'

function ListMahasiswa(props) {
  const [mahasiswa, setMahasiswa] = useState([])
  const { state } = useContext(AuthContext)

  const fetchData = () => {
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ state.token 
      }
    }

    axios.get(api + '/auth/api/v1/admin/mahasiswa', config)
      .then(res => {
        setMahasiswa(res.data.values)
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  if(!state.isAuthenticated) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <Container>
        <h2>Data Mahasiswa</h2>
        <hr />
        <Table>
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Jurusan</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map(mhs => 
              <tr key={mhs.id}>
                <td>{mhs.nim}</td>
                <td>{mhs.nama}</td>
                <td>{mhs.jurusan}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ListMahasiswa;