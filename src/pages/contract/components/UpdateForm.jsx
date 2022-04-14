import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,ProFormDigit
} from '@ant-design/pro-form';
//import styles from '../style.less';
import { Button, Result, Spin ,message} from 'antd';
import{ NResult } from '@/components/Result';
import { getByName } from '@/services/ant-design-pro/customer';
import { get } from '@/services/ant-design-pro/contract';
const UpdateForm = (props) => {
  const { done, visible, current, onDone, onSubmit,success,error } = props;
console.info('current',current);
  if (!visible) {
    return null;
  }
  
  return (
    <ModalForm labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"            
      visible={visible}
      title={ `合同${current ? '编辑' : '添加'}`}
      width={640}
      //initialValues={current}
      request={async () => {
        console.info('current',current)
        debugger
        if(current)
        {
          const msg = await  get({key:current.contractId})
          console.info('msg',msg)
          return (msg.data || {})           
        }
        else
        {return {};}
      }}
      onFinish={async (values) => {
        if (current) {
          values['contractId'] = current.contractId;
        }
        await onSubmit(values);
        return true;
      }}
      
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        maskClosable : false,
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="contractName"
            label="合同名称"
            rules={[
              {
                required: true,
                message: '请输入同名称',
              },
            ]}
            placeholder="请输入"
          />
          <ProFormText           
            label="合同编号"
            name="contractNo"
          />
          <ProFormDigit label="合同金额" name="contractAmt" width="sm" min={0}  />
          <ProFormDatePicker name="signDate" label="签订时间" />        
          <ProFormSelect
          name="customerId"
          label="客户名称"
          showSearch
          request={async ({ keyWords = '' }) => {
            const msg = await  getByName({name:keyWords})
            const data = msg.data.map((item,index) =>({
              label: item.customerName,
              value: item.customerId,
            }));
            console.info('data',data);
            return data;
          }}         
          />  
          <ProFormTextArea label="备注" name="remark" />
        </>
      ) : (<NResult onDone={onDone} success={success} error={error}></NResult>)
        }
    </ModalForm>

  );
};

export default UpdateForm;
