
import ReactDOM from 'react-dom';
import {Modal } from 'antd';

export const Msg = {
    error:(props)=>{
      if(props.content)
      {
        this.content = props.content.split('-》')[0];
        if(props.content.split('-》').length>1)
        {
          this.console = props.content.split('-》')[1];
          console.info('error',this.console)
        }
      }
      Modal.error({
          title:props.title,
          content: this.content,
        });
    },
    info:(props)=>{
      Modal.info({
        title:props.title,
        content: props.content,
      });
    },
    warning:(props)=>{
      Modal.warning({
        title:props.title,
        content: props.content,
      });
    },
    confirm:(props)=>{
      Modal.confirm({
        title:props.title,
        content: props.content,
        onOk:props.onOk,
        onCancel:props.onCancel,
      });
    },
    wait:(props)=>{
      return Modal.info({
        title:'请等待',
        content: props.content||'数据加载中...',
        okText:'  ',
        width:300,
        okButtonProps:{shape:"circle", loading:true}
      });
    },
}

// let wait1 = ZBMessage.wait({title:'保存失败',content:'保存'})
// let wait2 = ZBMessage.wait({title:'保存失败',content:'保存33333333333333333'})
// setTimeout(()=>{wait2.destroy();},3000)
// setTimeout(()=>{wait1.destroy();},5000)
 
//   export const modal1 =()=> (
//   <Modal
//   visible={true}
//   title="Title"
//   //onOk={this.handleOk}
//   //onCancel={this.handleCancel}
//   footer={[
//     null,
//     null,
//   ]}
// >Test For No TWO buttons on the footer.</Modal>);

export const ZBModal = () => {
  let div = document.createElement('div');
  document.body.appendChild(div);
  const close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
    }
  }
  const show=({ ...props})=>{
    ReactDOM.render(  <Modal   
      maskClosable={false}
      title="自定义标题"
      visible={true}
      footer={null}
      onCancel={close}
      {...props}
    >
      {props.content}
    </Modal>,div);
  }
  return {
    show: show,
    close: close
  }
}

