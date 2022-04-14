import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
//import styles from '../style.less';
import { Button, Result, Spin ,message} from 'antd';
import{ NResult } from '@/components/Result';
const UpdateForm = (props) => {
  const { done, visible, current, onDone, onSubmit,success,error } = props;

  if (!visible) {
    return null;
  }
  
  return (
    <ModalForm labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"            
      visible={visible}
      title={ `客户${current ? '修改' : '添加'}`}
      width={640}
      initialValues={current}
      request={async () => {
        if(current)
        {
          const msg = await  get({key:current.customerId})
          return (msg.data || {})           
        }
        else
        {return {};}
      }}
      onFinish={async (values) => {
        if (current) {
          values['customerId'] = current.customerId;
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
            name="customerName"
            label="客户名称"
            rules={[
              {
                required: true,
                message: '请输入客户名称',
              },
            ]}
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: "手机号为必填项",
              },
            ]}
            label="手机号"
            width="md"
            name="telephone"
          />
          <ProFormText label="邮箱" width="md" name="email" />
          <ProFormRadio.Group
            label="性别"
            name="sex"
            initialValue="male"
            options={[
              {
                value: 'male',
                label: '男',
              },
              {
                value: 'female',
                label: '女',
              },
            ]}
          />
          <ProFormText label="地址"   name="address" />
          <ProFormDatePicker label="生日"   name="birthday" />
          <ProFormTextArea label="备注"   name="remark" />
        </>
      ) : (<NResult onDone={onDone} success={success} error={error}></NResult>)
        }
    </ModalForm>

  );
};

export default UpdateForm;
