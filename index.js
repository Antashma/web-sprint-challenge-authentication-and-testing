const server = require('./api/server.js');
const colors = require('colors');

colors.setTheme( {
  severStart: ['inverse', 'bold']
})

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n *** Server listening on port ${PORT} *** \n` .severStart);
});
