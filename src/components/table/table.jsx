import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputIcon} from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';

const TableDefault = ({Doc}) => {
  const [documents, setDocuments] = useState(Doc);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  
  const columns = [
    {field: 'employee_id', header: 'Id'},
    {field: 'document_name', header: 'Document Name'},
    {field: 'document_type', header: 'Type'},
    {field: 'upload_date', header: 'Date'},
    {field: 'file_path', header: 'Path'},
  ];
  // Simulasi fetch data dari API
  useEffect(() => {
    setDocuments(Doc);
    initFilters();
  }, [Doc]);


  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: 'contains' },
      document_name: { value: null, matchMode: 'startsWith' },
      document_type: { value: null, matchMode: 'equals' },
      upload_date: { value: null, matchMode: 'equals' },
    });
    setGlobalFilterValue('');
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    
    <div className="flex justify-end">
      
      
      <IconField iconPosition='left' className='flex justify-center items-center p-2' style={{minHeight: '3rem'}}>
        <div className="flex mx-2">
        <InputIcon className="pi pi-search" />
        </div>
        <div className="flex">
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search Documents">
          <InputIcon className="pi pi-search" />
        </InputText>
        </div>
      </IconField>
    </div>
    )
  ;

  const header = renderHeader();

  

  

  

  return (
    <div className="">
      <DataTable
        value={documents}
        paginator
        rows={10}
        dataKey="employee_id"
        filters={filters}
        globalFilterFields={['document_name', 'document_type', 'file_path']}
        header={header}
        emptyMessage="No documents found."
        stripedRows 
        tableStyle={{ minWidth: '50rem', minHeight: '10rem'}}
        className="datatable-responsive"
        
      >
        {columns.map((col, i) => (
          <Column key={col.field} field={col.field} header={col.header} sortable />
        ))}
      </DataTable>
    </div>
  );
};

export default TableDefault;
