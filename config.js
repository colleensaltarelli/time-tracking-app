exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/time-tracking-app';
exports.TEST_DATABASE_URL = (
                            process.env.TEST_DATABASE_URL ||
                            'mongodb://localhost/time-tracking-app-test');
exports.JWT_SECRET = process.env.JWT_SECRET || 'TestTestTest';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';