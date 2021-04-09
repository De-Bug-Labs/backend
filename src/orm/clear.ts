import connection from '../connect';

connection.create().then(() => connection.clear());
