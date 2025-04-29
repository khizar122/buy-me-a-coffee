import { execSync } from 'child_process';

// Get the migration name from command-line arguments
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a migration name.');
  process.exit(1);
}

try {
  // Run the Prisma migration command
  execSync(`npx prisma migrate dev --name ${migrationName}`, {
    stdio: 'inherit'
  });
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Migration completed successfully!');
} catch (error) {
  console.error('Migration failed:', error.message || 'Unknown error');
}
