let path = `./${process.env.NODE_ENV}.env`;
require("dotenv").config({ path });
console.log(`\n\n********** BUILDING: ${process.env.NODE_ENV} **********\n\n`);