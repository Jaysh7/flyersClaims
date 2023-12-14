import { CSVLink } from "react-csv";
 function ExcelDownload() {
  const claims = [
  {
    employeeName : "Jayshree",
    employeeID: "1234",
    lead: "Thamo",
    reimbursementType : "bill",
    claimAmout : 1000,
 
  },
  {
    employeeName : "Jayshree",
    employeeID: "1234",
    lead: "Thamo",
    reimbursementType : "bill",
    claimAmout : 1000,
 
  },
  {
    employeeName : "Jayshree",
    employeeID: "1234",
    lead: "Thamo",
    reimbursementType : "bill",
    claimAmout : 1000,
 
  },
  {
    employeeName : "Jayshree",
    employeeID: "1234",
    lead: "Thamo",
    reimbursementType : "bill",
    claimAmout : 1000,
 
  },
  {
    employeeName : "Jayshree",
    employeeID: "1234",
    lead: "Thamo",
    reimbursementType : "bill",
    claimAmout : 1000,
 
  },
  {
    employeeName : "Jayshree",
    employeeID: "1234",
    lead: "Thamo",
    reimbursementType : "bill",
    claimAmout : 1000,
 
  },
  ];
  const headers = [
    {
      label:"Emp Name" , key: "employeeName"
    },
    {
      label:"Emp ID" , key: "employeeID"
    },
    {
      label:"Lead" , key: "lead"
    },
    {
      label:"Reimbursement Type" , key: "reimbursementType"
    },
    {
      label:"Claim Amount" , key: "claimAmout"
    },
  ]
  const csvLink = {
    filename: "claims.csv",
    headers: headers,
    data:claims,
  }
  return(
    <div>
      <CSVLink {...csvLink}>Download CSV</CSVLink>
    </div>
  )
 }
 export default ExcelDownload