import { request } from 'umi';
import defaultSettings from '../../../config/defaultSettings';
//import  request  from './request';

const appUrl = defaultSettings.appUrl;
export async function getPageList(params,options) {
  return request(appUrl+'/api/Customer/GetPageList', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
export async function get(params,options) {
  return request(appUrl+'/api/Customer/Get', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
export async function getView(params,options) {
  return request(appUrl+'/api/Customer/GetView', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getByName(params,options) {
  return request(appUrl+'/api/Customer/GetByName', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function add(body,options) {
  return request(appUrl+'/api/Customer/Add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function update(body,options) {
  return request(appUrl+'/api/Customer/Update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


export async function del(params,options) {
  return request(appUrl+'/api/Customer/Delete', {
    method: 'Delete',
    params: { ...params },
    ...(options || {}),
  });
}
export async function delBatch(body,options) {
  return request(appUrl+'/api/Customer/DeleteBatch', {
    method: 'Delete',
    data: body,
    ...(options || {}),
  });
}