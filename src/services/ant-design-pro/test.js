import { request } from 'umi';
import defaultSettings from '../../../config/defaultSettings';

/** 获取当前的用户 GET /api/currentUser */
const appUrl = defaultSettings.appUrl;
export async function test0(options) {
  console.info("defaultSettings",defaultSettings);
  return request(appUrl + '/api/Test/GetTest', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function test1(params,options) {
  return request('http://localhost/zbweb/api/Test/GetTest1', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}