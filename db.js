const Datastore = require('nedb');
const path = require('path');

// Veritabanı dosyasının yolunu belirleyin
const dbPath = path.resolve(__dirname, 'ozetleyici.db');

// Veritabanını oluşturun veya açın
const db = new Datastore({ filename: dbPath, autoload: true });

module.exports = db;
