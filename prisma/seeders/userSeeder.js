// /**
//  * Seeds users into the database.
//  * @param {import('@prisma/client').PrismaClient} prisma - The Prisma client instance.
//  */
// const userSeeder = async (prisma) => {
//   const users = [
//     {
//       email: 'john.doe@example.com',
//       password: '$2b$10$sRCP.DeSvX2XMi2ag.1q8ONKi4LBltqLXlVl/m/ndPN5dBrQpjY.G', // 'password456',
//       name: 'John Doe',
//       ProfileImage: 'https://ibb.co/VLCT3DW',
//       phone: '+1234567890',
//       country: 'USA',
//       city: 'New York',
//       streetNo: '123',
//       userType: 'user',
//       isRemember: false,
//       isActive: true,
//       otp: null,
//       isFirstLogin: true,
//       isVerified: false,
//       verificationToken: null,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       email: 'jane.smith@example.com',
//       password: '$2b$10$sRCP.DeSvX2XMi2ag.1q8ONKi4LBltqLXlVl/m/ndPN5dBrQpjY.G', // 'password456',

//       name: 'Jane Smith',
//       ProfileImage: 'https://ibb.co/VLCT3DW',
//       phone: '+9876543210',
//       country: 'UK',
//       city: 'London',
//       streetNo: '456',
//       userType: 'admin',
//       isRemember: true,
//       isActive: true,
//       otp: null,
//       isFirstLogin: true,
//       isVerified: false,
//       verificationToken: null,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//   ];

//   for (const user of users) {
//     await prisma.user.create({ data: user });
//   }

//   console.log('Users seeded successfully');
// };

// export default userSeeder;
