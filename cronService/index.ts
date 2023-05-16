// import * as request from 'request';
// import db from './src/databases/index';

// const options = {
//   method: 'GET',
//   url: 'https://testnet.snapshot.org/graphql',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     query: `query Proposals {
//   proposals (
//     first: 20,
//     skip: 0,
//     where: {
//       space_in: ["researchdao.eth"],
//       state: "active"
//     },
//     orderBy: "created",
//     orderDirection: desc
//   ) {
//     id
//     title
//     body
//     choices
//     start
//     end
//     snapshot
//     state
//     author
//     space {
//       id
//       name
//     }
//   }
// }`,
//     variables: {},
//   }),
// };

// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

// console.log('db', db);
import db from '../src/databases/index';

/**
 * function to connect with database
 *
 * @returns nothing
 */
async function connectToDB(): Promise<void> {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDB();
