// Credenciales

const ON_SERVER = window.location.hostname !== 'localhost';

const enviroments = {
  prod: {
    url_api: 'https://intranet-imperio.vercel.app',
  },
  dev: {
    url_api: 'http://sisapproveedores-env.us-east-2.elasticbeanstalk.com',
  },

  local : {
    url_api: 'http://localhost:3000',
  },
  devHeroku:{
    url_api: 'https://pruebaintranet.herokuapp.com',
  }
};

const enviromentsLogin ={
  prod: {
    url_api: ' https://sisap.gruporedsalud.com',
  },
  dev: {
    // url_api: 'https://sisap.gruporedsalud.com/sisap/login',
  },

  local : {
    url_api: 'http://localhost:4200/sisap/login',
  },

}



export const environment = ON_SERVER ? enviroments.prod : enviroments.local;
