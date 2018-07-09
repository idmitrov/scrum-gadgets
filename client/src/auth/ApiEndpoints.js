import ApiConfig from '../app/AppConfig';

const env = 'dev';
const apiConfig = ApiConfig[env];
const apiConnectionString = `//${apiConfig.api.host}:${apiConfig.api.port}/api`;

export const authEnpoints = {
  login: {
    url: `${apiConnectionString}/user/login`,
    method: 'POST'
  }
}
