const fs=require("fs");
const axios=require('axios');
let data = fs.readFileSync('C:\\Users\\hp\\OneDrive\\Desktop\\Naukri\\15\\obj15.json');
data=JSON.parse(data);
let zohoapi='https://recruit.zoho.in/recruit/v2/Candidates'
const accessToken='1000.77b54eeab8f89b5f0457cf4a2f843e54.51af276a7765ec5ad89afa2b46e2e313';

let addCandidatesZoho=async(data)=>{//completed
    console.log('Reavhed here');
      try{
        console.log('ABC');
        let resp=await axios.post(`${zohoapi}`,{data},{
              headers:{
                  'Authorization': `Zoho-oauthtoken ${accessToken}`,
              }
          });
          console.log('ABC',resp.data);
      }catch(err){
        console.log(err);
      }
}
let add=async(url)=>{
    try {
        console.log('AA');
        const response = await axios.post(url,null,{
            headers:{
                'Authorization':`Zoho-oauthtoken ${accessToken}`,
            },
        });
        console.log('ABCDEFGH',response);
    } catch (error) {
        console.error('Error adding tabular records:',error);
    }
}
let update=async(data)=>{
    console.log('hello')
    let resp=await axios.put(`${zohoapi}`,{data},{
        headers:{
            'Authorization':`Zoho-oauthtoken ${accessToken}`
        }
    })
    console.log(resp.data.data)
}
data["Additional_Skills"]=data["Additional_Skills"].join(',');
data["Skill_Set"]=data["Skill_Set"].join(',');
delete data["Experience_Details"];
delete data["Educational_Details"];
delete data["Technical_Skills"];
delete data["Certification_Details"];
delete data["Project_Details"];
delete data["Skill_Set"];
let XML=`<Candidates><FL val="Technical Skills"><TR no="0"><TL val="Skill Name">SAP FICO Module</TL><TL val="Version">ECC 6.0</TL><TL val="Last Used">2012</TL><TL val="Experience">3y</TL></TR><TR no="1"><TL val="Skill Name">MS Visio</TL><TL val="Version"></TL><TL val="Last Used">2011</TL><TL val="Experience">3y</TL></TR><TR no="2"><TL val="Skill Name">Operating Systems</TL><TL val="Version"></TL><TL val="Last Used"></TL><TL val="Experience"></TL></TR></FL><FL val="Educational Details"><TR no="0"><TL val="Institute / School">jayawant institute of management studies</TL><TL val="Degree">MBA/PGDM</TL><TL val="Major / Department">Finance</TL><TL val="Completion Year">2009 </TL></TR><TR no="1"><TL val="Institute / School">Jai Narain Vyas University</TL><TL val="Degree">B.Com</TL><TL val="Major / Department">Commerce</TL><TL val="Completion Year">2006 </TL></TR></FL><FL val="Certification Details"><TR no="0"><TL val="Certification Summary">SAP Certified Application Associate –Financial Accounting with SAP ERP 6.0 EHP4</TL></TR><TR no="1"><TL val="Certification Summary">SAP Certified Application Associate – Management Accounting with SAP ERP 6.0 EHP6</TL></TR><TR no="2"><TL val="Certification Summary">SAP Certifies Associate S/4 HANA Financial Accounting version 1909</TL></TR></FL><FL val="Experience Details"><TR no="0"><TL val="Occupation / Title">Solution Architect</TL><TL val="Company">Bosch Global Software Technologies (BGSW)</TL><TL val="Summary"></TL></TR><TR no="1"><TL val="Occupation / Title">Principal Consultant</TL><TL val="Company">Tieto Software Pvt Ltd.</TL><TL val="Summary">Presales:- Working experience on presales activities POC preparation Providing Demos Proposal writing Configuration sub modules as Accounts Receivables, Accounts Payables, General Ledger and Asset Accounting of Finance module of SAP with ECC 6.0 environment Analysis and correction of errors reported during unit and integration testing server</TL></TR><TR no="2"><TL val="Occupation / Title">Lead Consultant</TL><TL val="Company">Invenio Business Solutions</TL><TL val="Summary">? Handling the Change requests (SAP customization and ABAP changes), which includes preparation of Functional Specification, Preparation of Configuration documents, Moving the changes to staging (quality) server, Testing the solution in Staging (quality) server, Finally moving the changes to production client. ? Configuration sub modules as Accounts Receivables, Accounts Payables, General Ledger, Banking, Asset Accounting etc. of Finance module of SAP with ECC 6.0 environment ? GST reports GSTR1, GSTR2 development. ? Configuration of other sub-modules Extended Withholding tax, Dispute management, Travel management etc. ? Analysis and correction of errors reported during unit, integration and UAT testing ? Providing hyper care supports post Go-Live of Project. ? Working on other modules like PS/HR/MM/SD/PM as secondary consultant.</TL></TR><TR no="3"><TL val="Occupation / Title">Assistant Manager</TL><TL val="Company">Vodafone India Services Pvt. Ltd.</TL><TL val="Summary">? Handling the Change requests (SAP customization and ABAP changes), which includes preparation of Functional Specification, Preparation of Configuration documents, Moving the changes to staging (quality) server, Testing the solution in Staging (quality) server, Finally moving the changes to production client. ? Configuration sub modules as Accounts Receivables, Accounts Payables, General Ledger and Asset Accounting of Finance module of SAP with ECC 6.0 environment ? Analysis and correction of errors reported during unit and integration testing server ? Providing hyper care supports for the company codes which were gone live recently. ? Working as support consultant for SAP PS/HR/MM/SD areas</TL></TR><TR no="4"><TL val="Occupation / Title">Senior Functional Consultant</TL><TL val="Company">Tieto Software Technologies</TL><TL val="Summary">• One full life cycle implementation for SAP R/3 (experience includes understanding business requirements, system landscape, existing business processes in ‘AS-IS’ model, designing ‘TO-BE’ model and building ‘Future state of business processes’). • 10+ roll out projects • Three-production support and maintenance of SAP R/3 system of a Fortune 100 companies. • Experience in customization of FI/CO Sub Modules (Organizational structure, GL, AP, AR and AA) and in CO, Product Costing, COPA, Internal Order etc. • Understanding of ABAP code and debugging skill. • Business processes knowledge of various manufacturing companies, retails, and financial institution. • Exposure to Onsite-Offshore Project development and delivery process. • Experience in working various tools and other packages other than SAP, such as Remedy (ITIL compliant tracking tool for tickets and change requests), Mercury, HP Quality Centre, etc. • Preparing Requirement Document for customer approval • Prepare functional specifications for various changes. • Conducting gap analysis, assess scope of studies and suggest solutions through ERP. • Participate in responding to various RFP’s and POC development for demo purpose. • Guiding the Software Development Team for implementation and customizations • Worked on various interface with SAP FICO – e.g. Vendor Invoice Management (Open Text), Hyperion etc. • Worked with programming team for various report development and problem solving. • Worked on various sub modules IHC (In house cash Management), ICR, Inter- company Reconciliation, Accrual Engine etc. • Have worked on multiple sales cases.</TL></TR><TR no="5"><TL val="Occupation / Title">SAP FICO consultant</TL><TL val="Company">Capgemini</TL><TL val="Summary">• Using Customer’s own tool kept worked on incidents and change requests. • Monitoring tickets with respect to FI/CO module. • Analyzing the ticket and providing the solution to the client within the SLA. • Handling the Change requests (SAP customization and ABAP changes), which includes preparation of Functional Specification, Preparation of Configuration documents, Moving the changes to staging (quality) server, Testing the solution in Staging (quality) server, Finally moving the changes to production client.</TL></TR><TR no="6"><TL val="Occupation / Title">Process Executive</TL><TL val="Company">Infosys</TL><TL val="Summary">• Preparation bank reconciliation statements • Posting all adjustment entries before period close in system • Cash forecasting for the month • Running Cost centre reports for result analysis from ERP •Maintaining fixed assets register • Responsible for all the banking activities • Responsible for allocation of all the receipts in SAP • Preparing Balance Sheets • Passing Rectification entries • Training new resources</TL></TR><TR no="7"><TL val="Occupation / Title">Credit Controller</TL><TL val="Company">EXL Pvt Ltd</TL><TL val="Summary">• Maintaining fixed assets register • Responsible for allocation of all the receipts • Responsible for collection of premium from client • Training new resources</TL></TR></FL></Candidates>`;
const id='78806000001088032'
XML=XML.replace(/&/g,'and')
const url =`https://recruit.zoho.in/recruit/private/xml/Candidates/addTabularRecords?id=${id}&xmlData=${XML}`;
data.id=`${id}`
add(url);
update([data]);
//addCandidatesZoho([data])
//console.log(data);
