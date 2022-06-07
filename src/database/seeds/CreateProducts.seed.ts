// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
// import Product from '../entities/Product.Entity';

// export default class CreateProducts implements Seeder {
//   public async run(_: Factory, connection: Connection): Promise<any> {
//     const rows = await connection.getRepository(Product).count();
//     if (rows <= 0) {
//       await connection
//         .createQueryBuilder()
//         .insert()
//         .into(Product)
//         .values([
//           {
//             title: 'Produto 1',
//             description: 'Produto teste 1',
//             price: 10,
//           },
//           {
//             title: 'Produto 2',
//             description: 'Produto teste 2',
//             price: 20,
//           },
//         ])
//         .execute();
//     }
//   }
// }
