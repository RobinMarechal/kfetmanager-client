const electron = require('electron');
const sweet = require('sweet-electron')(electron);

sweet()
    .url(
        is =>
            is.dev() ? 'http://localhost:3000' : [__dirname, '../build/index.html'],
    )
    .window({ height: 800, width: 1550, minWidth: 1350, minHeight: 400 })
    .menu(null)
    .run();