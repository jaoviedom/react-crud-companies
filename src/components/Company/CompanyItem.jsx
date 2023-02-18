import React from "react";
import { useNavigate } from 'react-router-dom';
import * as CompanyServer from './CompanyServer';

const CompanyItem = ({company, listCompanies}) => {
  const navigate = useNavigate();

  const handleDelete = async (companyId) => {
    console.log(companyId);
    await CompanyServer.deleteCompany(companyId);
    //Reslistar las compañías
    listCompanies();
  };
  return(
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{company.name}<button className="ms-2 btn btn-sm btn-info" onClick={()=>{navigate(`/updateCompany/${company.id}`)}}>Update</button></h3>
          <p className="card-text">Founded: <span className="fw-bold">{company.foundation}</span></p>
          <div>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Go to website</a>
          </div>
          <button onClick={()=>company.id && handleDelete(company.id)} className="btn btn-danger my-2">Delete Company</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;