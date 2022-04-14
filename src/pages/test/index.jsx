import { Button, Result ,Upload} from 'antd';
import React from 'react';
import { history } from 'umi';
import { test0,test1 } from '@/services/ant-design-pro/test';
import {
  ProForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,ProFormDigit,ProFormUploadButton
} from '@ant-design/pro-form';
const testList = () => {

    const fileList=[
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://localhost/zbweb/api/Upload/GetImage?url=invoice\\jjp3skya.2bg.png',
      },
    ]
    const fileList1= ()=>{
      return [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://localhost/zbweb/api/Invoice/GetImage',
      },
    ]
  }
    return(<ProForm labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"            
      
    
      width={640}

     
      initialValues={{customerId:'open',imageUrl:fileList}}//'invoice\\jjp3skya.2bg.png'
     
    >
        <ProFormText           
            label="合同编号"
            name="contractNo"
          />
         <ProFormSelect
          name="customerId"
          label="支持搜索查询的 Select"
          showSearch
          debounceTime={300}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
          placeholder="Please select a country"
         
        />
    
    <ProFormUploadButton
            name="imageUrl"
            label="发票图像"
            
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              data:{floder:'invoice'},
              //defaultFileList:fileList1(),
              maxCount:1
            }}
            action="http://localhost/zbweb/api/Invoice/UploadPhoto"
          />
    </ProForm>)
      
    
    };

export default testList;
