import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,ProFormUploadButton
} from '@ant-design/pro-form';
import React, { useState, useRef } from 'react';
//import styles from '../style.less';
import { Button, Result, Spin ,message} from 'antd';
import{ NResult } from '@/components/Result';
import { getByName } from '@/services/ant-design-pro/contract';
import { get } from '@/services/ant-design-pro/invoice';
const UpdateForm = (props) => {
  //const formRef = useRef();
  const { done, visible, current, onDone, onSubmit,success,error } = props;

  if (!visible) {
    return null;
  }
  
  const defaultFileList=()=>{
    console.info('current',current)

    return [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://localhost/zbweb/api/Invoice/GetImage?url=1111',
      },
    ]
  }
  return (
    <ModalForm labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"            
      visible={visible}
      title={ `发票${current ? '修改' : '新增'}`}
      width={640}
      //initialValues={current}
      request={async () => {
        if(current)
        {
          const msg = await  get({key:current.invoiceId})
          console.info('msg.data',msg.data)
          msg.data.t['imageUrl'] = msg.data.f;
          console.info('msg.data1',msg.data.t)
          return (msg.data.t || {})          
        }
        else
        {return {};}
      }}
      onFinish={async (values) => {
        console.info('values',values)
        if (current) {
          values['invoiceId'] = current.invoiceId;
        }
        if(values.imageUrl)
        {
          values['imageUrl'] = values.imageUrl[0].response.data;
        }
        await onSubmit(values);
        return true;
      }}
      
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      //trigger={<>{children}</>}

      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        maskClosable : false,
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="invoiceName"
            label="发票名称"
            rules={[
              {
                required: true,
                message: '请输入发票名称',
              },
            ]}
          />
          <ProFormText          
            label="发票编号"
            width="md"
            name="invoiceNo"
          />
          <ProFormSelect
          name="contractId"
          label="合同名称"
          showSearch
          request={async ({ keyWords = '' }) => {
            const msg = await  getByName({name:keyWords})
            const data = msg.data.map((item,index) =>({
              label: item.contractName,
              value: item.contractId,
            }));
            return data;
          }}         
          />  
          <ProFormDatePicker label="开票日期"   name="makeDate" />
          <ProFormDigit label="发票金额" name="invoiceAmt"  min={0}  fieldProps={{ precision: 2 }}/>
          <ProFormDigit label="税额" name="invoiceTaxAmt"   min={0}  />
          <ProFormUploadButton
            name="imageUrl"
            label="发票图像"
            max={1}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              data:{floder:'invoice'},
            }}
            action="http://localhost/zbweb/api/Upload/UploadPhoto"
          />
          <ProFormTextArea label="备注" name="remark" />
        </>
      ) : (<NResult onDone={onDone} success={success} error={error}></NResult>)
        }
    </ModalForm>

  );
};

export default UpdateForm;
