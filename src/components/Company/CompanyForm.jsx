import React, { useEffect } from 'react';
import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as CompanyServer from './CompanyServer';

const CompanyForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  // console.log(params);

  const initialState = {id: 0, name: '', foundation: 1950, website: ''};
  const [company, setCompany] = useState(initialState);

  const handleInputChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setCompany({...company, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(company);
    try {
      let res;
      if(!params.id)
      {
        res = await CompanyServer.registerCompany(company);
        const data = await res.json();
        // console.log(data);
        if(data.message === 'Success') {
          setCompany(initialState);
        }
      } else {
        await CompanyServer.updateCompany(params.id, company);
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const getCompany = async (companyId) => {
    try {
      const res = await CompanyServer.getCompany(companyId);
      const data = await res.json();
      console.log(data);
      const {name, foundation, website} = data.companies;
      setCompany({name, foundation, website});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(params.id) {
      getCompany(params.id);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='col-md-3 mx-auto'>
      <h2 className='mb-3 text-center'>Company</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-floating mb-3'>
          <input type="text" name='name' value={company.name} onChange={handleInputChange} className='form-control' placeholder='name' maxLength="50" autoFocus required/>
          <label>Name</label>
        </div>
        <div className='form-floating mb-3'>
          <input type="text" name='foundation' value={company.foundation} onChange={handleInputChange} className='form-control' placeholder='name' min="1900" max="2023" required/>
          <label>Foundation</label>
        </div>
        <div className='form-floating mb-3'>
          <input type="text" name='website' value={company.website} onChange={handleInputChange} className='form-control' placeholder='name' maxLength="100" required/>
          <label>Website</label>
        </div>
        <div className="d-grid gap-2">
          {params.id ? (
            <button type="submit" className='btn btn-primary'>Update</button>
            
          ): (
            <button type="submit" className='btn btn-success'>Register</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
