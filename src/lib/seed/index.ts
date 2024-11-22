import seedProfessionals from './professionals';

async function seed() {
  console.log('Starting database seeding...');
  await seedProfessionals();
  console.log('Database seeding completed.');
  process.exit(0);
}

seed().catch(error => {
  console.error('Error during seeding:', error);
  process.exit(1);
});
