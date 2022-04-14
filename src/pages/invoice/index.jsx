import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Spin,Modal,Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormDatePicker, ProFormDateRangePicker, ProFormRadio } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { getPageList, add, get, update,del ,delBatch} from '@/services/ant-design-pro/invoice';
import { useRequest } from 'umi';
import {Msg} from '@/components/Message'
import {columnsView} from './columns'




/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */



const TableList = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(undefined);

  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const intl = useIntl();
  const columnsList = [
    {
      title: "发票名称",
      dataIndex: 'invoiceName',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "发票编号",
      dataIndex: 'invoiceNo',
      hideInSearch:true
    },
    {
      title: "开票日期",
      dataIndex: 'makeDate',
      valueType: 'date',
      hideInSearch:true
    },
    {
      title: "开票金额",
      dataIndex: 'invoiceAmt',  
      hideInSearch:true 
    },
    {
      title: "税额",
      dataIndex: 'invoiceTaxAmt',   
      hideInSearch:true
    },
    {
      title: "合同名称",
      dataIndex: 'contractName',
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <Popconfirm
        title="确认删除?"
        onConfirm={() => {
            handleDelete(record,false);
          }}
        //onCancel={cancel}
        okText="确认"
        cancelText="取消"
      >
        <a href="#">删除</a>
      </Popconfirm>,
      ],
    },
  ];

  

  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFakeList(params);
      }

      if (method === 'update') {
        return update(params);
      }

      return add(params);
    },
    {
      //throwOnError:true,
      manual: true,
      onSuccess: (result) => {
        console.info('result',result);
      },
      onError:(result) => {
        console.info('result1',result);
      },
    },
  );
  //事件
  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrentRow({});
  };

  // const handleSubmit = (values) => {
  //   setDone(true);
  //   const method = values?.id ? 'update' : 'add';
  //   postRun(method, values);
  // };

  const handleSubmit = async (fields) => {
    let msg; 
    let result; 
    try {
      msg = Msg.wait({content:'数据保存中'});

      result = fields.invoiceId ? await update({ ...fields }) : await add({ ...fields });
 
      if (actionRef.current) {
          actionRef.current.reload();
      }
      setSuccess(true);
      return true;
    }      
    catch (error) {
      setSuccess(false);
      setError(error||result.message);
      return false;
    }
    finally{
      msg.destroy();
      setDone(true);
    }
  };

  const handleDelete = async (record,isBatch) => {
    let msg; 
    let result; 
    if (!record) return true;
  
    try {
      msg = Msg.wait({content:'数据删除中'});
      result = isBatch?await delBatch(record.map((row) => row.invoiceId)):await del({key:record.invoiceId});
      if (actionRef.current) {
        isBatch?actionRef.current ?.reloadAndRest ?.():actionRef.current.reload();
      }
      return true;
    } 
    catch (error) {      
      return false;
    }
    finally{
      msg.destroy();
    }
  };

  return (
    <PageContainer>
      <ProTable
        pagination={{
        pageSize: 10,
        }}
        headerTitle="发票管理"
        actionRef={actionRef}
        rowKey="invoiceId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(undefined);
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params,
          sort,
          filter,
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          let p = {
            current: params.current,
            pageSize: params.pageSize,
            invoiceName: params.invoiceName || '',
            contractName: params.contractName || '',
          }
          const msg = await getPageList(p);
          return {
            data: msg.data.list,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: msg.ok,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: msg.data.page.totalCount,
          };
        }}
        columns={columnsList}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState ?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
              &nbsp;&nbsp;

            </div>
          }
        >
        <Popconfirm
         title="确认删除?"
         onConfirm={() => {
           handleDelete(selectedRowsState,true);
          setSelectedRows([]);
           }}
         //onCancel={cancel}
         okText="确认"
         cancelText="取消"
         >
         <Button>
            批量删除
          </Button>
       </Popconfirm>

        </FooterToolbar>
      )}

      <UpdateForm    
        success={success}   
        error={error}   
        done={done}
        visible={visible}
        current={currentRow}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow ?.invoiceName && (
          <ProDescriptions
            column={2}
            title={currentRow ?.invoiceName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow ?.invoiceId,
            }}
            columns={columnsView}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
