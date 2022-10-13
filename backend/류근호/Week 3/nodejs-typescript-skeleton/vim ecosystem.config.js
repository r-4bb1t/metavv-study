module.exports = { 
    apps: [ 
      { 
        name: 'express-test', 
        cwd: 'src', 
        script: 'ts-node index.ts', 
        autorestart: true, 
        instances: 1,
      }, 
    ], 
  };