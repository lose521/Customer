
import {Result,Button,Alert  } from 'antd';
const { ErrorBoundary } = Alert;
export const NResult = (props) => {
    const { onDone,success,error } = props;
    console.info('error',error)
    const onClick = () => {
       if (error) {
        throw error;
      }
    };
    
    return(success?
        (<Result
        status="success"
        title="操作成功"
        extra={
          <Button type="primary" onClick={onDone}>
            确认
          </Button>
        }/>
        ):(<Result
        status="error"
        title="操作失败"
        subTitle = {error.message}
        extra={[
            // <Button type="primary" onClick={onDone}>
            //   返回
            // </Button>,
            <Button type="primary" onClick={onDone}>
              关闭
            </Button>,
          ]}>
              <div>
                  <ErrorBoundary>
                  <Button danger onClick={onClick}>
                     查看异常
                    </Button>
                  </ErrorBoundary>
              </div>
          </Result>
          )
    )
}


