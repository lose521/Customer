import moment from 'moment';

export const columnsView = [
    {
      title: "合同名称",
      dataIndex: 'contractName',
    },
    {
      title: "合同编号",
      dataIndex: 'contractNo',
    },   
    {
      title: "合同金额",
      dataIndex: 'contractAmt',
    },
    {
      title: "签订时间",
      dataIndex: 'signDate',
      render:(text, record, index)=>
      {
        return text ? moment(text).format('YYYY-MM-DD') : ''
      }
    },
    {
      title: "客户名称",
      dataIndex: 'customerName',
    },
  ]